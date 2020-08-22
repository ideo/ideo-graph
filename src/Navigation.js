import React from 'react';

function Navigation({
  filterByRole,
  filterByLocation,
  filterByLeadershipTeam,
  filterByAffiliation,
  activeFilter,
  minimized,
  toggleMinimize,
  filterValues: {
    roleFilterValues,
    locationFilterValues,
    leadershipTeamFilterValues,
    affiliationFilterValues
  }
}) {
  return (
    <div className="filter-container flex flex-column">
      <header className={`pv2 ph2 flex items-center flex-row filters-header relative ${minimized ? 'minimized' : 'expanded'}`} onClick={toggleMinimize}>
        <div className="absolute fw7 f2 toggle-icon">
          {minimized ? '+' : '–' }
        </div>
        <h1 className="f4 fw7 ml4">IDEO Decision Makers</h1>
      </header>

      {!minimized &&
        <>
          <main className="pv2 ph3 flex flex-column filters-content">

            <header className="flex flex-row items-center justify-start">
              <h3 className="f5 fw7 mb2 mt2 mr2">
                Filter By Role
  </h3>

            </header>

            <ul className="filters filters-role flex flex-column mb2">
              {roleFilterValues.sort().map((filter, idx) => (
                <li
                  key={idx}
                  onClick={filterByRole.bind(null, filter)}
                  className={`filter mb1 filter-role flex flex-column ${filter === activeFilter ? 'active' : ''}`}>
                  {filter}
                </li>
              ))}
            </ul>

            <header className="flex flex-row items-center justify-start">
              <h3 className="f5 fw7 mb2 mt4 mr2">
                Filter By Location
</h3>

            </header>

            <ul className="filters filters-location flex flex-column">
              {locationFilterValues.sort().map((filter, idx) => (
                <li
                  key={idx}
                  onClick={filterByLocation.bind(null, filter)}
                  className={`filter mb1 filter-role flex flex-column ${filter === activeFilter ? 'active' : ''}`}>
                  {filter}
                </li>
              ))}
            </ul>


          </main>
          <footer className="pa2">
            <p className="lh-copy f7 fw4">
            This is a map of IDEO decision makers by location. <br/> It's meant to help with wayfinding for 101ers, as they get familiar with the breadth of IDEO! To see the full IDEO community, please head to <a className="black underline" href="https://inside.ideo.com">inside.IDEO.com</a>
        </p>
          </footer>

        </>
      }



    </div>
  )
}

export default Navigation;