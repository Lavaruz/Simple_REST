const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    cutomerId:{
        type:Date,
        required: true,
        default: Date.now()
    },
    name: String,
    item: String
})

module.exports = mongoose.model('Customer', customerSchema)