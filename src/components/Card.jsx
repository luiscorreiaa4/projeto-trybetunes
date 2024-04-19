import { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import '../style/Card.css';

export default class Card extends Component {
  render() {
    const { name, imgUrl, link, collectionId } = this.props;
    return (
      <Link to={ link } className="card" data-testid={ `link-to-album-${collectionId}` }>
        <h2>{ name }</h2>
        <img src={ imgUrl } alt={ name } />
      </Link>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
};
