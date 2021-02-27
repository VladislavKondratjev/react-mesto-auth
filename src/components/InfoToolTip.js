import success from '../../src/images/popup_type_success_background.svg';

export default function InfoToolTip(props) {
    return (
        <div className={`popup popup_type_success ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <img
                    src={success}
                    alt="success" />
                <button type="button" className="popup__close-button button" onClick={props.onClose} />
                <h2 className="tooltip__title">Вы успешно зарегистрировались!</h2>
            </div>
        </div>
    )
}