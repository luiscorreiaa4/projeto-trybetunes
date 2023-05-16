import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  state = {
    name: '',
    isLoading: false,
  };

  handleName = ({ target }) => {
    this.setState({ name: target.value });
  };

  handleClick = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });
    await createUser({
      name,
    });
    this.setState({
      isLoading: false,
    });
    history.push('./search');
  };

  render() {
    const { name, isLoading } = this.state;
    const buttonDisabled = () => {
      const MIN_LENGTH = 3;
      return name.length < MIN_LENGTH;
    };
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          name="name"
          value={ name }
          onChange={ this.handleName }
        />
        <button
          data-testid="login-submit-button"
          disabled={ buttonDisabled() }
          onClick={ this.handleClick }
        >
          ENTRAR
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
