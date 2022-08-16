const express = require('express')

const Customers = require('../models/customer.mongo')
const customersRoute = express.Router()

// GET
customersRoute.get('/',async(req,res)=>{
    try{
        const customer = await Customers.find()
        res.status(200).json(customer)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// GET ONE
customersRoute.get('/:id',getCustomerById, (req,res)=>{
    try{
        res.status(200).json(res.customer)
    }catch(err){
        res.status(404).json({message: "no customer found"})
    }
})

// POST
customersRoute.post('/', async (req,res)=>{
    try{
        const newCustomer = await Customers.create({
            name: req.body.name,
            item: req.body.item
        })
        res.status(201).json(newCustomer)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

// UPDATE
customersRoute.patch('/:id',getCustomerById, async(req,res)=>{
    if(req.body.name != null){
        res.customer.name = req.body.name
    }
    if(req.body.item != null){
        res.customer.item = req.body.item
    }
    try{
        const updatedCustomer = await res.customer.save()
        res.json({updatedCustomer})
    }catch(err){
        res.json({message: err.message})
    }
})

// DELETE
customersRoute.delete('/:id', getCustomerById, async(req,res)=>{
    try{
        const customerDelete = await Customers.deleteOne(res.customer)
        return res.json({customerDelete, message: "customer deleted"})
    }catch(err){
        return res.status(400).json({message: err.message})
    }
})


async function getCustomerById(req,res,next){
    let customer
    try{
        customer = await Customers.findById(req.params.id)
        if(customer == null){
            return res.status(404).json({message: "customer not found"})
        }
    }catch(err){
        return res.status(400).json({message: err.message})
    }
    res.customer = customer
    next()
}


module.exports = {
    customersRoute
}