import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'

export default function Card(props) {
    const { currentUser } = React.useContext(CurrentUserContext)

    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        ` ${isOwn ? 'element__delete-button' : ''}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_type_active' : ' '}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <article className="element">
            <img className="element__photo" alt={props.card.name} src={props.card.link} onClick={handleClick} />
            <button type="button" className={`${cardDeleteButtonClassName} button`} onClick={handleDeleteClick} />
            <div className="element__info">
                <h2 className="element__place">{props.card.name}</h2>
                <button type="button" className={`${cardLikeButtonClassName} button`} onClick={handleLikeClick} />
                <span className="element__likes">{props.card.likes.length}</span>
            </div>
        </article>
    );
}