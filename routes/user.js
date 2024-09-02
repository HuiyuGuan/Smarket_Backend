const router = require('express').Router()
const Item = require('../models/item')
const User = require('../models/user')
const database = require('../models/database')
// const { user } = require('pg/lib/defaults')

router.get('/', async(req, res) => {
    try{
        const users = await User.findAll()
        res.status(200).send(users)
    }catch(error){
        res.status(404).send(error.message)
    }
    }   
)

router.get('/:username', async(req, res) => {
    try{
        const users = await User.findByPk(req.params.username)
        res.status(200).send(users)
    }catch(error){
        res.status(404).send(error.message)
    }
    }   
)

router.post('/', async(req, res) => {
    try{
        const newUser = await User.create(req.body)
        res.json(newUser)
    }catch (error){
        res.send(error.message)
    }
})
    // let { username } = req.body;
    // let { password} = req.body;
    // let {name } = req.body;
    // let { email } = req.body;
    // let { phone } = req.body;
    // let {country} = req.body;

    // User.create({
    //   username,
    //   password,
    //   name,
    //   email,
    //   phone,
    //   country

    // })
    //   .then(User => {
    //     res.status(201).json(User);
    //   })
    //   .catch(err => {
    //     res.status(400).json(err);
    //   }); 


module.exports = router;