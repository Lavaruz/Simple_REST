require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/simpleREST')
const db = mongoose.connection
db.on('error', (err)=>console.error(err))
db.on('open', ()=>console.log('connected to db'))

const {customersRoute} = require('./routes/customers')

app.use(express.json())

app.use('/customers', customersRoute)

app.listen(3000, ()=> console.log('server started'))