import React from 'react';
import Header from './Header.js'
import Footer from './Footer.js'
import Main from './Main.js'
import EditProfilePopup from './EditProfilePopup.js'
import ImagePopup from './ImagePopup.js'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import CurrentUserContext from '../contexts/CurrentUserContext'
import { api } from "../utils/api";
import { Route, Switch, } from "react-router-dom";

export default function App() {
  const [isEditAvatarPopupOpen, setAvatarIsOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddIsOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditIsOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(CurrentUserContext);
  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setAvatarIsOpen(true)
  }

  function handleEditProfileClick() {
    setEditIsOpen(true)
  }

  function handleAddPlaceClick() {
    setAddIsOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link })
  }

  function closeAllPopups() {
    setAvatarIsOpen(false);
    setAddIsOpen(false);
    setEditIsOpen(false);
    setSelectedCard(false)
    //setConfirmIsOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) =>
          c._id === card._id
            ? newCard
            : c);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deletetCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => {
          return c._id !== card._id
        })
        setCards(newCards)
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api.postCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    api.getUserData()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch((err) => console.log(err));

    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, [])

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <div className="page__container">
          <Header />
          <InfoToolTip />
          {/* <Switch> */}
          {/* <Login /> */}
          <Register />
          {/* <Main
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onClose={closeAllPopups}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          /> */}
          <ImagePopup
            name="image-caption"
            isOpen={selectedCard}
            card={selectedCard}
            onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />
          {/* </Switch> */}
          <Footer />
        </div>
      </div >
    </CurrentUserContext.Provider >
  );
}

