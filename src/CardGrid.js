import React, { useState, useCallback } from 'react';
import Card from './Card'; 

function CardGrid({ individuals }) {
  return (
    <section className="card-grid">
      {
        individuals.map((individual, idx) => {
          return (<Card key={idx} details={individual} />)
        })
      }
    </section>
  )
}

export default CardGrid;