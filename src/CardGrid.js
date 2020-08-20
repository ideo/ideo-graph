import React, { useState, useCallback } from 'react';
import Card from './Card'; 

function CardGrid({ nodes }) {
  return (
    <section className="card-grid flex flex-row  flex-wrap">
      {
        nodes.map((node, idx) => {
          return (<Card key={idx} details={node} />)
        })
      }
    </section>
  )
}

export default CardGrid;