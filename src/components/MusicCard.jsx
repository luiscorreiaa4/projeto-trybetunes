import { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { track } = this.props;
    const { trackName, previewUrl } = track;
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
  }).isRequired,
};
