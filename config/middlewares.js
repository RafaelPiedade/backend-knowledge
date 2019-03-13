const bodParser = require('body-parser')
const cors = require('cors')

module.exports = app =>{
    app.use(bodParser.json())
    app.use(cors())
}