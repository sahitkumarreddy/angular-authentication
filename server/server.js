const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cors = require('cors')

const PORT = 3000

const api = require('./routes/api')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(expressValidator());

app.use('/api',api)

app.get('/',function(req,resp){
    resp.send('Hello from server')
})

app.listen(PORT,function(){
    console.log('Server running on port::'+PORT)
})
