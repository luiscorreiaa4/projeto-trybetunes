import { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import '../style/Favorites.css';

export default class Favorites extends Component {
  state = {
    favorites: [],
  };

  componentDidMount() {
    this.saveFavoriteState();
  }

  saveFavoriteState = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favorites });
  };

  render() {
    const { favorites } = this.state;
    console.log(favorites);
    return (
      <>
        <Header />
        <main data-testid="page-favorites" className="favorites-container">
          <div className="favorites-header">
            <h2 className="favorites-title">Músicas Favoritas:</h2>
          </div>
          <div className="content-favorites">
            {
              favorites.map((e) => (
                <MusicCard
                  key={ e.trackId }
                  track={ e }
                  checked
                  artistName={ e.artistName }
                />
              ))
            }
          </div>
        </main>
      </>
    );
  }
}
