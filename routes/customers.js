const express = require('express')

const Customers = require('../models/customer.mongo')
const customersRoute = express.Router()

// GET
customersRoute.get('/',async(req,res)=>{
    try{
        const customer = await Customers.find()
        res.status(200).json(customer)
    }catch(err){
        res.status(500).json(err)
    }
})

// GET ONE
customersRoute.get('/:id',getCustomerById, (req,res)=>{
    res.status(200).json(res.customer)
})

// POST
customersRoute.post('/', async(req,res)=>{
    try{
        await Customers.findOneAndUpdate({
            name: req.body.name
        }, req.body, {upsert:true, new: true})
        res.status(201).json({message: "cutomer created"})
    }catch(err){
        res.send(400).json(err)
    }
})

// UPDATE
customersRoute.patch('/:id', (req,res)=>{
    
})

// DELETE
customersRoute.delete('/:id', async(req,res)=>{
    try{
        await Customers.remove(res.customer)
        res.json({message: "customer deleted"})
    }catch(err){
        res.status(400).json(err)
    }
})


async function getCustomerById(req,res,next){
    let customer
    try{
        paramId = req.params.id
        customer = await Customers.findById(paramId)
    }catch(err){
        return res.status(400).json({message: 'no customer found'})
    }
    res.customer = customer
    next()
}


module.exports = {
    customersRoute
}