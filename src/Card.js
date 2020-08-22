import React from 'react';

function Card({ details: {
  fullName,
  image,
  role,
  homeOffice,
  entityType,
  description,
  labLocations,
  studio,
  misc,
  leadershipTeamFilter,
  affiliationFilter
} }) {
  return (
    <article className="card flex relative flex-column justify-start flex-wrap">
      {(entityType === 'individual') &&
        <header className="mb2">
          {image.length > 0 && <img alt={fullName} src={image} />}
        </header>
      }

      <main className={`flex flex-column ${entityType !== 'individual' ? 'pt2' : ''}`}>

        <div className="flex flex-column w-100">
          <h1 className="ph2 fw7 f4 tracked-tight mb1">
            {fullName}
          </h1>
          <h2 className="ph2 fw4 f5 tracked-tight">
            {role && role[0]}
          </h2>
          <h3 className="ph2 fw4 mt1 f6 tracked-tight">
            {leadershipTeamFilter && leadershipTeamFilter.join(', ')}
          </h3> 

        </div>

      </main>
      <footer style={{flexGrow: 4}} className="flex flex-column w-100">
        {(misc && misc.length > 0) &&
          <p className="pa2 fw3 f5 tracked-tight">
            {misc.join(' ')}
          </p>
        }
        {
          description &&
          <p className="pa2 fw4 f6 lh-copy">
            {description}
          </p>
        }

      </footer>
      <div className="pa2 location flex justify-between flex-column w-100 mt3">

        <div className="flex row">
          <div className={`flex flex-row items-center ${entityType === 'individual' ? 'w-50' : 'w-100'}`}>
            <div style={{ flexShrink : '0' }} className="mr1 flex" >
            <svg fill="#000000" viewBox="0 0 32 32" x="0px" y="0px"><title>Artboard 11</title><g data-name="11-home"><path d="M25,28H19a1,1,0,0,1-1-1V22H14v5a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16H3a1,1,0,0,1-.61-1.79l13-10a1,1,0,0,1,1.22,0l13,10A1,1,0,0,1,29,16H26V27A1,1,0,0,1,25,28Zm-5-2h4V15a1,1,0,0,1,1-1h1.06L16,6.26,5.94,14H7a1,1,0,0,1,1,1V26h4V21a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z"></path></g></svg>
            </div>
            
            <h3 className="tracked-tight f6">
              {homeOffice && homeOffice[0]}
            </h3>
            <h3 className="tracked-tight f6">
              {labLocations && labLocations.join(', ')}
            </h3>

          </div>

          {
            (homeOffice && studio && homeOffice[0] !== studio) &&
            <div className="flex flex-row items-center w-50">
              <div style={{ flexShrink : '0' }} className="mr1 flex" >
              <svg fill="#000000" version="1.1" x="0px" y="0px" viewBox="0 0 16 16" style={{ enableBackground: 'new 0 0 16 16' }}><path d="M13,4h-1V3.5C12,2.673,11.327,2,10.5,2h-5C4.673,2,4,2.673,4,3.5V4H3C1.897,4,1,4.897,1,6v5c0,1.103,0.897,2,2,2h10  c1.103,0,2-0.897,2-2V6C15,4.897,14.103,4,13,4z M5,3.5C5,3.224,5.224,3,5.5,3h5C10.776,3,11,3.224,11,3.5V4H5V3.5z M14,11  c0,0.552-0.448,1-1,1H3c-0.552,0-1-0.448-1-1V6c0-0.552,0.448-1,1-1h1v1.5C4,6.776,4.224,7,4.5,7S5,6.776,5,6.5V5h6v1.5  C11,6.776,11.224,7,11.5,7S12,6.776,12,6.5V5h1c0.552,0,1,0.448,1,1V11z"></path></svg>
              </div>
              
              <h3 className="tracked-tight f6">
                {studio}
              </h3>
            </div>
          }

        </div>


      </div>
    </article>
  )
}

export default Card;