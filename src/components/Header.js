import logo from '../../src/images/logo.svg';
import { Route, Switch, Link } from "react-router-dom";

export default function Header({ loggedIn, email, onSignOut }) {
    return (
        <header className="header">
            <img
                className="header__logo"
                src={logo}
                alt="Место Россия"
            />
            <ul className="header__links">
                <Switch>
                    <Route path="/sign-up">
                        <li className="header__link"><Link className="header__link link" to="/sign-in">Войти</Link></li>
                    </Route>
                    <Route path="/sign-in">
                        <li className="header__link"><Link className="header__link link" to="/sign-up">Регистрация</Link></li>
                    </Route>
                </Switch>
                {loggedIn
                    ?
                    <>
                        <li className="header__email">{email}</li>
                        <li className="header__link" onClick={onSignOut}><Link className="header__link link" to="/sign-in">Выйти</Link></li>
                    </>
                    : ''}
            </ul>
        </header >
    )
}