import { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
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

  handleFavorite = async ({ target }) => {
    this.setState({
      isLoading: true,
    });
    const { track } = this.props;

    if (target.checked) {
      await addSong(track);
      this.setState({
        checked: true,
      });
    }
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { track } = this.props;
    const { checked, isLoading } = this.state;
    const { trackName, previewUrl, trackId } = track;
    if (isLoading) return <Loading />;
    return (
      <div>
        <h4>{ trackName }</h4>
        <audio
          src={ previewUrl }
          data-testid="audio-component"
          controls
        >
          <track kind="captions" />
        </audio>
        <label>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name="favorite"
            onChange={ this.handleFavorite }
            checked={ checked }
          />
        </label>
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
  checked: PropTypes.bool.isRequired,
};
