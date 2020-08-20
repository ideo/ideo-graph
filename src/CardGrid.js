import React, { useState, useCallback } from 'react';
import Card from './Card';

function CardGrid({ nodes }) {
  return (
    <section className="card-grid relative flex flex-column">
      <header className={`ph2 fixed flex items-center flex-row filters-header relative ${false ? 'minimized' : 'expanded'}`} onClick={() => { console.log('header click') }}>
        <div className="absolute fw7 f2 close-icon">
          +
        </div>
      </header>
      <main class="flex flex-row flex-wrap">
        {
          nodes.map((node, idx) => {
            return (<Card key={idx} details={node} />)
          })
        }
      </main>

    </section>
  )
}

export default CardGrid;