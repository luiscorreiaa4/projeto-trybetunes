import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../style/Profile.css';

export default class Profile extends Component {
  state = {
    userName: '',
    profilePic: 'https://lh5.googleusercontent.com/-ScnXlu8ypiI/AAAAAAAAAAI/AAAAAAAAACE/UizJ7lvhvlE/photo.jpg',
    email: '',
    description: '',
    isLoading: false,
  };

  componentDidMount() {
    this.getAccount();
  }

  getAccount = async () => {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    const { name, email, image, description } = user;
    const newState = {
      userName: name,
    };

    if (email) {
      newState.email = email;
    }
    if (image) {
      newState.image = image;
    }
    if (description) {
      newState.description = description;
    }
    newState.isLoading = false;
    this.setState(newState);
  };

  handleEdit = () => {
    const { history } = this.props;
    history.push('/profile/edit');
  };

  render() {
    const { userName, profilePic, email, description, isLoading } = this.state;
    return (
      <>
        <Header />
        {!isLoading ? (
          <div className="profile-container">
            <div className="profile-header">
              <img
                className="profile-pict"
                src={ profilePic }
                alt="Profile"
              />
            </div>
            <div className="profile-body-container">
              <div className="profile-body">
                <div>
                  <h2 className="field">Nome</h2>
                  <p data-testid="profile-name">
                    {userName || 'Cristiano Ronaldo'}
                  </p>
                </div>
                <div>
                  <h2 className="field">Email</h2>
                  <p data-testid="profile-email">
                    {email || 'Adicione seu Email'}
                  </p>
                </div>
                <div>
                  <h2 className="field">Descrição</h2>
                  <p data-testid="profile-description">
                    {description || 'Crie sua descrição'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={ this.handleEdit }
                  className="profile-edit-button"
                >
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Profile.defaultProps = {
  history: {
    push: () => {},
  },
};
