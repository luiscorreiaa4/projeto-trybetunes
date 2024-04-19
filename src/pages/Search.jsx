import { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/Card';
import Loading from '../components/Loading';
import '../style/Search.css';

export default class Search extends Component {
  state = {
    name: '',
    artist: '',
    isLoading: false,
    albums: [],
  };

  handleName = ({ target }) => {
    this.setState({ name: target.value });
  };

  handleClick = async () => {
    const { name } = this.state;

    this.setState({
      isLoading: true,
    });

    const albums = await searchAlbumsAPI(name)
      .catch((error) => {
        console.log(error);
        this.setState({
          name: '',
          artist: '',
          isLoading: false,
        });
      });

    this.setState({
      name: '',
      artist: name,
      isLoading: false,
      albums,
    });
  };

  limparPlacholder = ({ target }) => {
    target.placeholder = '';
  };

  adicionaPlaceholder = ({ target }, placeHolder) => {
    target.placeholder = placeHolder;
  };

  render() {
    const { name, isLoading, artist, albums } = this.state;

    const buttonDisabled = () => {
      const MIN_LENGTH = 2;
      return name.length < MIN_LENGTH;
    };

    return (
      <main className="page-search-container">
        <Header />
        <div>
          {!isLoading && (
            <div data-testid="page-search" className="page-search">
              <input
                className="input-search"
                type="text"
                name="name"
                placeholder="Pesquise álbuns, artistas"
                onFocus={ this.limparPlacholder }
                onBlur={ (e) => this.adicionaPlaceholder(e, 'Pesquise álbuns, artistas') }
                data-testid="search-artist-input"
                onChange={ this.handleName }
                value={ name }
              />
              <button
                className="button-search"
                data-testid="search-artist-button"
                disabled={ buttonDisabled() }
                onClick={ this.handleClick }
              >
                Procurar
              </button>
            </div>
          )}
          {isLoading && <Loading />}
        </div>
        <div className="content-search">
          {artist && !isLoading && (
            <h1>
              Resultado de álbuns de:
              {' '}
              {artist}
            </h1>
          )}
          <div className="result">
            {albums.map((e) => (
              <Card
                key={ e.collectionId }
                name={ e.collectionName }
                imgUrl={ e.artworkUrl100 }
                link={ `/album/${e.collectionId}` }
                collectionId={ e.collectionId }
              />
            ))}
            {albums.length === 0 && artist && !isLoading && (
              <p>Nenhum álbum foi encontrado</p>
            )}
          </div>
        </div>
      </main>
    );
  }
}
