import { Component } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import '../style/ProfileEdit.css';

export default class ProfileEdit extends Component {
  state = {
    userName: '',
    profilePic: 'https://lh5.googleusercontent.com/-ScnXlu8ypiI/AAAAAAAAAAI/AAAAAAAAACE/UizJ7lvhvlE/photo.jpg',
    email: '',
    description: '',
  };

  componentDidMount() {
    this.getAccount();
  }

  getAccount = async () => {
    const user = await getUser();
    const { name, email, image, description } = user;
    const newState = {
      userName: name,
    };

    if (email) {
      newState.email = email;
    }
    if (image) {
      newState.profilePic = image;
    }
    if (description) {
      newState.description = description;
    }
    newState.isLoading = false;
    this.setState(newState);
  };

  validateForm = () => {
    const magicNumber = 2;
    const { userName, email, description, profilePic } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (userName.length <= magicNumber) return false;
    if (description.length <= magicNumber) return false;
    if (profilePic.length <= magicNumber) return false;
    return emailRegex.test(email);
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSave = async () => {
    const { history } = this.props;
    if (!this.validateForm()) {
      Swal.fire({
        title: 'Oops!',
        text: 'Preencha os campos corretamente.',
        icon: 'warning',
      });
      return;
    }
    const { userName, email, description, profilePic } = this.state;
    const user = {
      name: userName,
      email,
      image: profilePic,
      description,
    };
    await updateUser(user);
    history.push('/profile');
  };

  render() {
    const { userName, profilePic, email, description } = this.state;
    return (
      <>
        <Header />
        <main data-testid="page-profile-edit" className="edit-container">
          <div className="edit-header">
            <div className="edit-image-container">
              <img
                className="edit-image"
                src={ profilePic }
                alt="Profile"
              />
            </div>
          </div>
          <div className="edit-body">
            <div>
              <h2 className="field">Nome</h2>
              <input
                type="text"
                value={ userName }
                name="userName"
                data-testid="profile-name-input"
                className="edit-text"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <h2 className="field">Email</h2>
              <input
                type="text"
                value={ email }
                name="email"
                data-testid="profile-email-input"
                className="edit-text"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <h2 className="field">Foto de Perfil</h2>
              <input
                type="text"
                value={ profilePic }
                name="profilePic"
                className="edit-text"
                onChange={ this.handleChange }
              />
            </div>
            <div>
              <h2 className="field">Descrição</h2>
              <textarea
                value={ description }
                name="description"
                data-testid="profile-description-input"
                onChange={ this.handleChange }
                className="edit-textarea"
              />
            </div>
            <div>
              <button
                type="button"
                className="profile-save-button"
                onClick={ this.handleSave }
              >
                Salvar Perfil
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
