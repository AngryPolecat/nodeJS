const path = require('path')

console.log(path.basename(__filename))
console.log(path.dirname(__filename))
console.log(path.extname(__filename))
console.log(path.resolve(__dirname, '..', './02-basics', './index.js'))
console.log(path.join(__dirname, '..', './02-basics', './index.js'))
