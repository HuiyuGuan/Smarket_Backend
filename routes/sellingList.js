const router = require('express').Router()
const SellingList = require('../models/selllingList')
const database = require('../models/database')

router.get('/', async(req, res) => {
    try{
        const SellingLists = await SellingList.findAll()
        res.status(200).send(SellingLists)
    }catch(error){
        res.status(404).send(error.message)
    }
    }
)

router.post('/', async(req, res) => {
    try{
        const newSellingList = await SellingList.create(req.body)
        res.json(newSellingList)
    }catch (error){
        res.send(error.message)
    }
})

module.exports = router;