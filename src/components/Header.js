import logo from '../../src/images/logo.svg';

export default function Header() {
    return (
        <header className="header">
            <img
                className="logo"
                src={logo}
                alt="Место Россия"
            />
        </header>
    )
}