const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    date:{
        type:Date,
        required: true,
        default: Date.now()
    },
    name: {
        type:String,
        required: true,
    },
    item: {
        type:String,
        required: true,
    }
})

module.exports = mongoose.model('Customer', customerSchema)