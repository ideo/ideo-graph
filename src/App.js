import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import 'tachyons';
import 'reset-css';
import _ from 'lodash';
import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';

import dataSet from './data';
import Navigation from './Navigation';
import CardGrid from './CardGrid';
const BASE_VAL = 1;
let graph = null;
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
  'Labs',
  'Global'
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

function createLinks({ nodes, links }) {

  const locations = _.uniq(_.flatten(nodes.map(({ locationFilter }) => locationFilter))).
    filter(node => !!node)

  const locationNodes = locations.map(location => ({
    id: location,
    fullName: location,
    entityType: 'location'
  })).filter(({ id, fullName }) => {
    // console.log(id, fullName )
    return !['lab-palmwood', 'Labs'].includes(fullName);
    // return true;
  })

  locationNodes.push({
    id: 'Asia',
    fullName: 'Asia',
    entityType: 'location'
  })

  let newLinks = [...links]
  const newNodes = [...nodes, ...locationNodes]

  newNodes.forEach(node => {

    if (['individual'].includes(node.entityType) && node.locationFilter && node.locationFilter.length > 0) {
      node.locationFilter.forEach(location => {
        newLinks.push({
          source: node.id,
          target: location,
          val: 2
        })
      })
      //remove link between Mitch and Labs
      newLinks = newLinks.filter(({source, target}) => {
        return !(source === 'mitch-sinclair' && target === 'Labs')
      })

      node.val = BASE_VAL * 1

    } else if (['lab'].includes(node.entityType) && node.labGroup && node.labGroup.length > 0) {
      newLinks.push({
        source: node.id,
        target: node.labGroup,
        val: 2
      })
      node.val = BASE_VAL * 0.5
    } else if (['labGroup'].includes(node.entityType)) {
      node.val = BASE_VAL * 0.5
      newLinks.push({
        source: node.id,
        target: 'labGroup',
        val: 0.5
      })
    } else if (['lab'].includes(node.entityType)) {
      node.val = BASE_VAL * 0.5
    } else if (['location'].includes(node.entityType)) {
      node.val = BASE_VAL * 0.5
    } else if (['root'].includes(node.entityType)) {
      node.val = BASE_VAL * 2
    }


  })


  newLinks.push({ source: 'Munich', target: 'Europe', val: 20 })
  newLinks.push({ source: 'London', target: 'Europe', val: 2 })
  newLinks.push({ source: 'Europe', target: 'ideo', val: 2 })
  newLinks.push({ source: 'Chicago', target: 'ChiCamNY', val: 2 })
  newLinks.push({ source: 'Cambridge', target: 'ChiCamNY', val: 2 })
  newLinks.push({ source: 'New York', target: 'ChiCamNY', val: 2 })
  newLinks.push({ source: 'ChiCamNY', target: 'ideo', val: 2 })
  // newLinks.push({ source: 'Chicago', target: 'ideo', val: 2 })
  // newLinks.push({ source: 'New York', target: 'ideo', val: 2 })
  newLinks.push({ source: 'Asia', target: 'ideo', val: 2 })
  newLinks.push({ source: 'Tokyo', target: 'Asia', val: 2 })
  newLinks.push({ source: 'Shanghai', target: 'Asia', val: 2 })
  newLinks.push({ source: 'Bay', target: 'ideo', val: 2 })
  newLinks.push({ source: 'labGroup', target: 'ideo', val: 2 })
  newLinks.push({ source: 'Global', target: 'ideo', val: 2 })

  newLinks.push({ source: 'lab-palmwood', target: 'labGroup', val: 2 })
  newLinks.push({ source: 'lab-lighthouse', target: 'labGroup', val: 2 })
  newLinks.push({ source: 'lab-group-d-ford', target: 'labGroup', val: 2 })
  newLinks.push({ source: 'lab-la-victoria-lima', target: 'labGroup', val: 2 })

  // newLinks.push({ source: 'labGroup', target: 'labGroup', val: 2 })


  return {
    nodes: newNodes,
    links: newLinks
  }
}

function initializeGraph(data, el,  handleNodeClick) {

  graph = ForceGraph3D({
    rendererConfig: {
      alpha: true,
      antialias: true
    },
    controlType: 'trackball'
  })
    (el)
    .backgroundColor('rgba(0, 0, 0, 0)')
    .graphData(data)
    // .nodeAutoColorBy('studio')
    .nodeColor(function (node) {

    })
    .linkColor(function (node) {
      return '#000000'
    })
    .linkWidth(function (node) {
      return 0
    })
    .nodeVal(function (node) {
      // console.log(node.val)
      return node.val;
    })
    .nodeLabel(function (node) {
      return `
        <div class="pa3 node-label flex flex-row flex-wrap">
          <main class="flex flex-column">
            <h1 class="f5 ma0 fw7">${node.fullName}</h1>
          </main>
        </div>
      `
    })
    .nodeThreeObject(function (node) {
      let geometry = null
      let material = null
      let color = 0x000000
      if (node.entityType === 'individual') {
        const [role] = node.role
      

        geometry = new THREE.IcosahedronBufferGeometry(3, 2);
        
        material = new THREE.MeshBasicMaterial({ color: color, wireframe: true });

        return new THREE.Mesh(geometry, material)
      } else if (node.entityType === 'root') {
        geometry = new THREE.IcosahedronBufferGeometry(3, 0);
        
        material = new THREE.MeshBasicMaterial({ color: color, wireframe: true });
        return new THREE.Mesh(geometry, material)

      } else {
        geometry = new THREE.IcosahedronBufferGeometry(2, 0);
        material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
        return new THREE.Mesh(geometry, material)

      }
    })
    .linkOpacity(0.8)
    .linkWidth(0.2)
    .zoomToFit()
    .onNodeHover(node => el.style.cursor = node ? 'pointer' : null)
    .onNodeClick(node => {
      // Aim at node from outside it
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      graph.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        2000  // ms transition duration
      );

      handleNodeClick(node)

    });

}

function App() {

  const [data, setData] = useState(source);
  const [sceneActive, setSceneActive] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);
  const [minimized, setMinimized] = useState(false)
  const [gridOpen, setGridOpen] = useState(false)
  const sceneEl = useRef(null)

  function resetFilter() {
    setData({...source})
    setActiveFilter(null)
  }

  useEffect(() => {
    // initializeGraph(createLinks(data), sceneEl.current)
  }, [data])

  function applyFilter(key, value) {
    resetFilter();
    setActiveFilter(value);
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
    // console.log(filteredFilterableNodes)
    setData(filteredData)
    window.scrollTo(0, 0);
    setGridOpen(true);
    setSceneActive(false);
  }
  
  const filterByRole = applyFilter.bind(null, 'roleFilter');
  const filterByLocation = applyFilter.bind(null, 'locationFilter');
  const filterByLeadershipTeam = applyFilter.bind(null, 'leadershipTeamFilter');
  const filterByAffiliation = applyFilter.bind(null, 'affiliationFilter');

  useEffect(() => {
    initializeGraph(
      createLinks(data),
      sceneEl.current,
      (node) => {
        // console.log(node, ' peek a boo')
        if (node.filterable) {
          setData({nodes: [node], links: []})
          setGridOpen(true)
          setSceneActive(true)
        }
      }
    
    )
  }, [])

  useEffect(() => {
    function handleResize() {
      graph.width(window.innerWidth)
      graph.height(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
  
  return (
    <div className="app">

      <div 
        id="scene"
        style={{
          zIndex: sceneActive ? 1 : -1
        }} 
        ref={sceneEl}>
      </div>

      <Navigation
        minimized={minimized}
        toggleMinimize={() => { setMinimized(!minimized) }}
        activeFilter={activeFilter}
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

    { gridOpen &&
      <CardGrid
        activeFilter={activeFilter}
        handleCloseClick={() => { 
          // console.log('close click')
          resetFilter(); 
          setGridOpen(false); 
          setSceneActive(true); 
        }}
        nodes={data.nodes.filter(({filterable}) => filterable)}
      />
    }

    </div>
  );
}

export default App;
