import React, { useState, useCallback } from 'react';
import Card from './Card';

function CardGrid({ nodes, handleCloseClick }) {
  const sorted = nodes.sort((one, two) => {
    if (one.fullName > two.fullName) {
      return 1;
    }
    if (two.fullName > one.fullName) {
        return -1;
    }
    return 0;
  })
  // put mitch last
  if (!!sorted.find(node => node.fullName === 'Mitch Sinclair')) {
    const mitch = sorted.find(node => node.fullName === 'Mitch Sinclair')
    const index = sorted.indexOf(mitch);
    const [node] = sorted.splice(index,1)
    sorted.push(node)
  }

  return (
    <section className="card-grid pb2 relative flex flex-column">
      <header className={`ph2 fixed flex items-center flex-row filters-header relative ${false ? 'minimized' : 'expanded'}`}>
        <div className="absolute fw7 f2 close-icon" onClick={handleCloseClick}>
          +
        </div>
      </header>
      <main className="flex flex-row flex-wrap">
        {
         sorted.map((node, idx) => {
            return (<Card key={idx} details={node} />)
          })
        }
      </main>

    </section>
  )
}

export default CardGrid;