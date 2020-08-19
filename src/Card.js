import React from 'react';

function Card({ details: { fullName } }) {
  return (
    <article className="card">
      <header>

      </header>
      <main>
          <h3>
            {fullName}
          </h3>
      </main>
    </article>
  )
}

export default Card;