import { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    return (
      <div>
        <Header />
        <div
          data-testid="page-search"
        >
          <input
            type="text"
            name=""
            data-testid="search-artist-input"
          />
          <button
            name=""
            data-testid="search-artist-button"
          >
            asd
          </button>
        </div>
      </div>
    );
  }
}
