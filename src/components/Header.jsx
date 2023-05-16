import { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    userName: '',
    isLoading: true,
  };

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    const { name } = await getUser();
    this.setState({
      userName: name,
      isLoading: false,
    });
  };

  render() {
    const { userName, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ userName }</p>
        <div><Link to="/search" data-testid="link-to-search">Pesquisar</Link></div>
        <div><Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link></div>
        <div><Link to="/profile" data-testid="link-to-profile">Perfil</Link></div>
      </header>
    );
  }
}
