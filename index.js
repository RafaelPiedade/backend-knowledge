const app = require('express')();
const consign = require('consign')
const db = require('./config/db')

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config')
    .into(app)

app.listen(3000, ()=>{
    console.log('Server on port 3000...')
})