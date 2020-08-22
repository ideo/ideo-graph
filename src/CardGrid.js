import React, { useState, useCallback } from 'react';
import Card from './Card';

function CardGrid({ nodes, handleCloseClick }) {
  return (
    <section className="card-grid pb2 relative flex flex-column">
      <header className={`ph2 fixed flex items-center flex-row filters-header relative ${false ? 'minimized' : 'expanded'}`}>
        <div className="absolute fw7 f2 close-icon" onClick={handleCloseClick}>
          +
        </div>
      </header>
      <main className="flex flex-row flex-wrap">
        {
          nodes.sort((one, two) => {
            const firstName1 = one.firstName
            const firstName2 = two.firstName
            // console.log('_____',    two.fullName, one.fullName)
            if (one.fullName > two.fullName) {
              return 1;
            }
            if (two.fullName > one.fullName) {
                return -1;
            }
            return 0;
            // return one.fullName - two.fullName

          }).map((node, idx) => {
            return (<Card key={idx} details={node} />)
          })
        }
      </main>

    </section>
  )
}

export default CardGrid;