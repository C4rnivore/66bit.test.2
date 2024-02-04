import './Header.css'
import logo from '../../assets/logo.svg'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

function Header() {
    return ( 
        <header className="header">
            <img src={logo} alt="66bit logo" className='header_logo' />
            <div className="header_contacts">
                <a className='header_contacts_link header_contacts_tel' href="tel:+73432908476">+7 343 290 84 76</a>
                <a className='header_contacts_link header_contacts_mail' href="mailto:info@66bit.ru">info@66bit.ru</a>
                <ThemeSwitch/>
            </div>
        </header> 
    );
}

export default Header;