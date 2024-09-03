const router = require('express').Router()
const Category = require("../models/category");
const database = require('../models/database');

router.get('/', async(req, res) => {
    try{
        const categories = await Category.findAll()
        res.status(200).send(categories)
    }catch(error){
        res.status(404).send(error.message)
    }
    }
)

router.post('/', async(req, res) => {
    try{
        const newCategory = await Category.create(req.body)
        res.json(newCategory)
    }catch (error){
        res.send(error.message)
    }
})

module.exports = router;