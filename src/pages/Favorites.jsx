import { Component } from 'react';
import Header from '../components/Header';

export default class Favorites extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-favorites" />
      </div>
    );
  }
}
