import React, { useState, useEffect } from 'react';
import './App.css';
import 'tachyons';
import 'reset-css';
import dataSet from './data';
import Navigation from './Navigation';
import CardGrid from './CardGrid';

const source = { ...dataSet }
const roleFilterValues = [
  'Managing Director',
  'Chief Officer',
  'Partner Emeritus'
];
const locationFilterValues = [
  'Bay',
  'Cambridge',
  'Chicago',
  'New York',
  'Shanghai',
  'Tokyo',
  'London',
  'Munich',
  'Labs'
];
const leadershipTeamFilterValues = [
  'Executive Leadership Team',
  'Chicago Leadership Team',
  'Europe Leadership Team',
  'London Leadership Team',
  'Munich Leadership Team',
  'New York Leadership Team',
  'Shanghai Leadership Team'
];
const affiliationFilterValues = [
  'Helix Leadership Circle',
  'Heartbeat',
  'Pulse'
];

function App() {

  const [data, setData] = useState(source);
  const [activeFilter, setActiveFilter] = useState(null);

  function resetFilter() {
    setData({...source})
    setActiveFilter(null)
  }

  function applyFilter(key, value) {
    setActiveFilter(key);
    const nodes = [...source.nodes];
    const links = [...source.links];
    const filterableNodes = [];
    const otherNodes = [];
    nodes.forEach(node => {
      if (node.filterable) {
        filterableNodes.push(node);
      } else {
        otherNodes.push(node);
      }
    });
    const filteredFilterableNodes = filterableNodes.filter(node => {
      if (node[key] && node[key].includes(value)) {
        return true;
      }
      return false;
    })
    const filteredData = {
      links,
      nodes: [...filteredFilterableNodes, ...otherNodes]
    };
    console.log(filteredFilterableNodes)
    setData(filteredData)
  }
  
  const filterByRole = applyFilter.bind(null, 'roleFilter');
  const filterByLocation = applyFilter.bind(null, 'locationFilter');
  const filterByLeadershipTeam = applyFilter.bind(null, 'leadershipTeamFilter');
  const filterByAffiliation = applyFilter.bind(null, 'affiliationFilter');

  
  return (
    <div className="app">

      <Navigation
        filterByRole={filterByRole}
        filterByLocation={filterByLocation}
        filterByLeadershipTeam={filterByLeadershipTeam}
        filterByAffiliation={filterByAffiliation}
        resetFilter={resetFilter}
        filterValues={{
          locationFilterValues, 
          leadershipTeamFilterValues, 
          roleFilterValues, 
          affiliationFilterValues
        }}
      />

    <CardGrid 
      individuals={data.nodes.filter(point => point.entityType === 'individual')}
    />

    </div>
  );
}

export default App;
