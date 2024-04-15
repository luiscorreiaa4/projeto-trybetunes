import { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoSearchOutline, IoStarOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { getUser } from '../services/userAPI';
import Logo from '../assets/logo.svg';
import './Header.css';

export default class Header extends Component {
  state = {
    userName: '',
  };

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    const { name } = await getUser();
    this.setState({
      userName: name,
    });
  };

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component" className="Header">
        <div className="header-top">
          <Link to="/search">
            {' '}
            <img src={ Logo } alt="TrybeTunes" />
          </Link>
          <Link to="/profile">
            <h4 className="suco" data-testid="header-user-name">
              <IoPersonCircleOutline />
              { userName }
            </h4>
          </Link>
        </div>
        <nav className="menu">
          <NavLink
            className="menu-item"
            activeClassName="active"
            to="/search"
            data-testid="link-to-search"
          >
            <IoSearchOutline />
            Pesquisar
          </NavLink>
          <NavLink
            className="menu-item"
            activeClassName="active"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            <IoStarOutline />
            Favoritas
          </NavLink>
          <NavLink
            className="menu-item"
            activeClassName="active"
            to="/profile"
            data-testid="link-to-profile"
          >
            <IoPersonCircleOutline />
            Perfil
          </NavLink>
        </nav>
      </header>
    );
  }
}
