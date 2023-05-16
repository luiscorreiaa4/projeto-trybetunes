import { Component } from 'react';
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
      </header>
    );
  }
}
