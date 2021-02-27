export default function Login() {

    return (
        <>
            <div className="sign-in">
                <h3 className="sign-in__title">Вход</h3>
                <form
                    className="sign-in__form"
                    method="PATCH"
                    action="#">
                    <input
                        id="email"
                        autoComplete="off"
                        type="email"
                        className="sign-in__input popup__input_type_email"
                        placeholder="Email"
                        minLength="9"
                        maxLength="40"
                        required
                    // onChange={handleChangeName}
                    //value={name || ''}
                    />
                    <input
                        id="password"
                        autoComplete="off"
                        type="password"
                        className="sign-in__input popup__input_type_password"
                        placeholder="Пароль"
                        minLength="8"
                        maxLength="15"
                        required
                    // onChange={handleChangeAbout}
                    // value={about || ''}
                    />
                    <button type="submit" className="sign-in__submit-button">
                        Войти
                    </button>
                </form>
            </div>
        </>
    )
}