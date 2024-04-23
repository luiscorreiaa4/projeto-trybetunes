import { Component } from 'react';
import PropTypes from 'prop-types';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../style/MusicCard.css';

export default class MusicCard extends Component {
  state = {
    checked: false,
  };

  componentDidMount() {
    const { checked } = this.props;
    this.setState({ checked });
  }

  componentDidUpdate(prev) {
    const { checked } = this.props;
    if (prev.checked !== checked) {
      this.setState({ checked });
    }
  }

  handleFavorite = async () => {
    const { track } = this.props;
    const { checked } = this.state;

    try {
      if (checked) {
        await removeSong(track);
      } else {
        await addSong(track);
      }

      this.setState({
        checked: !checked,
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  render() {
    const { track, artistName } = this.props;
    const { checked } = this.state;
    const { trackName, previewUrl, trackId } = track;
    return (
      <div className="player">
        <div className="name-and-artist">
          <h4 className="trackName">{trackName}</h4>
          <h5 className="artistName">{artistName}</h5>
        </div>
        <div className="audio-and-favorite">
          <audio
            src={ previewUrl }
            data-testid="audio-component"
            controls
            className="audio"
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <input
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            className="favorite visually-hidden"
            onChange={ this.handleFavorite }
            checked={ checked }
          />
          <label htmlFor={ `checkbox-music-${trackId}` }>
            { checked ? <IoHeart /> : <IoHeartOutline /> }
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  artistName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};
