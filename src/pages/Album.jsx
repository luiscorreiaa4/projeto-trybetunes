import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../style/Album.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    name: '',
    album: '',
    imgUrl: '',
    tracks: [],
    favoriteSongs: [],
  };

  componentDidMount() {
    this.fetchMusics();
    getFavoriteSongs().then((e) => {
      this.setState({ favoriteSongs: e });
    });
  }

  fetchMusics = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const musics = await getMusics(id);

    this.setState({
      name: musics[0].artistName,
      album: musics[0].collectionName,
      tracks: musics.slice(1),
      imgUrl: musics[0].artworkUrl100,
    });

    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      favoriteSongs,
    });
  };

  render() {
    const { name, album, tracks, imgUrl, favoriteSongs } = this.state;
    return (
      <>
        <Header />
        <main className="album-container">
          <div data-testid="page-album" className="page-album">
            <img src={ imgUrl } alt={ album } className="album-image" />
            <div className="album-data">
              <h2 data-testid="album-name" className="album-name">{ album }</h2>
              <p data-testid="artist-name" className="artist-name">{ name }</p>
            </div>
          </div>
          <div className="content-album">
            {
              tracks.map((e) => (
                <MusicCard
                  key={ e.trackId }
                  track={ e }
                  checked={ favoriteSongs
                    .some((song) => Number(song.trackId) === Number(e.trackId)) }
                />
              ))
            }
          </div>
        </main>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
