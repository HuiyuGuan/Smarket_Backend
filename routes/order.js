const router = require('express').Router()
const Order = require("../models/order")
const database = require('../models/database')

router.get('/', async(req, res) => {
    try{
        const orders = await Order.findAll()
        res.status(200).send(orders)
    }catch(error){
        res.status(404).send(error.message)
    }
    }
)

router.post('/', async(req, res) => {
    try{
        const newOrder = await Order.create(req.body)
        res.json(newOrder)
    }catch (error){
        res.send(error.message)
    }
})

module.exports = router;