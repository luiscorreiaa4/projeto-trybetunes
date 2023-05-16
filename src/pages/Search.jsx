import { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-search" />
      </div>
    );
  }
}
