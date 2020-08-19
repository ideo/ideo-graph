import React from 'react';

function Navigation({
  filterByRole,
  filterByLocation,
  filterByLeadershipTeam,
  filterByAffiliation,
  resetFilter,
  filterValues: {
    roleFilterValues,
    locationFilterValues,
    leadershipTeamFilterValues,
    affiliationFilterValues
  }
}) {
  return (
    <div className="filter-container">
      <header className="pv0 ph2 flex items-center flex-row filters-header relative">
        <div className="absolute fw7 f8 toggle-icon">
          -
      </div>
        <h1 className="f6 fw7 ml3">IDEO Morphology</h1>
      </header>

      <main className="pv2 ph3 flex flex-column filters-content">

        <header className="flex flex-row items-center justify-start">
          <h3 className="f7 fw7 ml2 mb3 mt3 mr2">
            Filter By Role
        </h3>
          <div className="f7 fw3 filters-clear filters-clear-roles">
            [clear]
        </div>
        </header>

        <ul className="filters filters-role flex flex-column mb2">
          {roleFilterValues.map((filter, idx) => (
            <li 
              key={idx}
              onClick={filterByRole.bind(null, filter)}
              className="filter filter-role flex flex-column">
              {filter}
            </li>
          ))}
        </ul>

        <header className="flex flex-row items-center justify-start">
          <h3 className="f7 fw7 ml2 mb3 mt3 mr2">
            Filter By Location
        </h3>
          <div className="f7 fw3 filters-clear filters-clear-roles">
            [clear]
        </div>
        </header>

        <ul className="filters filters-location flex flex-column">
        {locationFilterValues.map((filter, idx) => (
          <li 
            key={idx}
            onClick={filterByLocation.bind(null, filter)}
            className="filter filter-rol flex flex-column">
            {filter}
          </li>
        ))}
        </ul>

        <header className="flex flex-row items-center justify-start">
          <h3 className="f7 fw7 ml2 mb3 mt3 mr2">
            Filter By Leadership Teams
        </h3>
          <div className="f7 fw3 filters-clear filters-clear-roles">
            [clear]
        </div>
        </header>

        <ul className="filters filters-leadership-teams flex flex-column">
          {leadershipTeamFilterValues.map((filter, idx) => (
            <li 
              key={idx}
              onClick={filterByLeadershipTeam.bind(null, filter)}
              className="filter filter-rol flex flex-column">
              {filter}
            </li>
          ))}
        </ul>

        <header className="flex flex-row items-center justify-start">
          <h3 className="f7 fw7 ml2 mb3 mt3 mr2">
            Filter By Groups
        </h3>
          <div className="f7 fw3 filters-clear filters-clear-roles">
            [clear]
        </div>
        </header>

        <ul className="filters filters-affiliations flex flex-column">
        {affiliationFilterValues.map((filter, idx) => (
          <li 
            key={idx}
            onClick={filterByAffiliation.bind(null, filter)}
            className="filter filter-rol flex flex-column">
            {filter}
          </li>
        ))}
        </ul>

      </main>

      <footer className="pa2">
        <p className="lh-copy f7 fw4">
          This is a map of IDEO decisoin makers by location.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat dui a quam congue, et vulputate erat iaculis. Cras velit lacus, pellentesque sit amet gravida at, laoreet a nulla.
      </p>
      </footer>

    </div>
  )
}

export default Navigation;