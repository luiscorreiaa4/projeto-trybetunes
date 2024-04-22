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

  limparPlaceholder = ({ target }) => {
    target.placeholder = '';
  };

  adicionarPlaceholder = ({ target }, placeholder) => {
    target.placeholder = placeholder;
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
        <div className="page-search">
          <div data-testid="page-search" className="inputs">
            <input
              className="input-search"
              type="text"
              name="name"
              placeholder="Pesquise álbuns, artistas"
              onFocus={this.limparPlaceholder}
              onBlur={(e) => this.adicionarPlaceholder(e, 'Pesquise álbuns, artistas')}
              data-testid="search-artist-input"
              onChange={this.handleName}
              value={name}
            />
            <button
              className="button-search"
              data-testid="search-artist-button"
              disabled={buttonDisabled()}
              onClick={this.handleClick}
            >
              Procurar
            </button>
          </div>
        </div>
        {isLoading && <Loading />}
        {albums.length === 0 && !isLoading && ( // Adiciona o texto quando não há resultados
          <div className="content-before">
            <h1>Qual artista está procurando hoje?</h1>
          </div>
        )}
        {artist && !isLoading && ( // Renderiza a div "content-search" se existirem álbuns
          <div className="content-search">
            <h1 className="nameSearched">
              Resultado de álbuns de: {artist}
            </h1>
            <div className="result">
              {albums.map((e) => (
                <Card
                  key={e.collectionId}
                  name={e.collectionName}
                  imgUrl={e.artworkUrl100}
                  artist={e.artistName}
                  link={`/album/${e.collectionId}`}
                  collectionId={e.collectionId}
                />
              ))}
              {albums.length === 0 && (
                <p>Nenhum álbum foi encontrado</p>
              )}
            </div>
          </div>
        )}
      </main>
    );
  }
}
