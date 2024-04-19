import React from 'react';
import '../style/Loading.css';

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
    </section>
  );
}
