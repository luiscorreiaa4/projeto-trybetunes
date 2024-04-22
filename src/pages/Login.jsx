import { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Logo from '../assets/logo.svg';
import Loading from '../components/Loading';
import '../style/Login.css';

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
    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({ isLoading: false });
    history.push('/search');
  };

  limparPlacholder = ({ target }) => {
    target.placeholder = '';
  };

  adicionarPlaceholder = ({ target }, placeHolder) => {
    target.placeholder = placeHolder;
  };

  render() {
    const { name, isLoading } = this.state;
    const buttonDisabled = () => {
      const MIN_LENGTH = 3;
      return name.length < MIN_LENGTH;
    };
    return (
      <main className="mainLogin">
        {!isLoading && (
          <div className="login">
            <img src={ Logo } alt="Trybe Tunes" />
            <input
              type="text"
              data-testid="login-name-input"
              className="input-login"
              placeholder="Digite seu nome"
              name="name"
              value={ name }
              onChange={ this.handleName }
              onFocus={ this.limparPlacholder }
              onBlur={ (e) => this.adicionarPlaceholder(e, 'Digite seu nome') }
            />
            <button
              data-testid="login-submit-button"
              disabled={ buttonDisabled() }
              className="button-login"
              onClick={ this.handleClick }
            >
              ENTRAR
            </button>
          </div>
        )}
        {isLoading && <Loading />}
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
