import React from 'react';
import './Loading.css';

export default function Loading() {
  return (
    <section className="loading">
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <h3>Carregando...</h3>
    </section>
  );
}
