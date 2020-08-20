const data = require('./data.json')
const fs = require('fs')

const output = {...data}

output.nodes.forEach(node => {
  if (node.entityType === 'individual') {
    node.image = `./images/${node.fullName.split(' ').join('_')}.jpg`
  }
})

fs.writeFileSync('./output.json', JSON.stringify(output));
