import { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoSearchOutline, IoStarOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { getUser } from '../services/userAPI';
import Logo from '../assets/logo.svg';
import Loading from './Loading';
import '../style/Header.css';

export default class Header extends Component {
  state = {
    userName: '',
    profilePic: 'https://lh5.googleusercontent.com/-ScnXlu8ypiI/AAAAAAAAAAI/AAAAAAAAACE/UizJ7lvhvlE/photo.jpg',
    isLoading: false,
  };

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    this.setState({
      isLoading: true,
    });
    const { name, image } = await getUser();
    if (image) {
      this.setState({
        userName: name,
        profilePic: image,
        isLoading: false,
      });
    } else {
      this.setState({
        userName: name,
        isLoading: false,
      });
    }
  };

  render() {
    const { userName, profilePic, isLoading } = this.state;
    return (
      <header data-testid="header-component" className="Header">
        <Link to="/search">
          {' '}
          <img className="logo" src={ Logo } alt="TrybeTunes" />
        </Link>
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
        {!isLoading && (
          <Link to="/profile" className="usr">
            <img
              className="profile-pic"
              src={ profilePic }
              alt="Profile"
              data-testid="header-profile-picture"
            />
            <h4 className="suco" data-testid="header-user-name">
              { userName }
            </h4>
          </Link>
        )}
        {isLoading && <Loading />}
      </header>
    );
  }
}
