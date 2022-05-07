import logo from '../images/logo.svg';

const Header = ({ children, onSignOut }) => {
  return (
    <header className="header">
      <a className="logo" href="">
        <img className="logo__image" src={logo} alt="Логотип Место" />
      </a>
      <nav className='header__nav'>
        {children}
      </nav>
    </header>
  )
}

export default Header;
