const express = require('express')
const router = express.Router();
const Shirt = require('../models/shirt.model')
const auth = require('../middleware/auth')

router.use(express.json())

router.route('/').get((req, res) => {
    Shirt.find()
        .then(shirts => res.json(shirts))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', auth, async(req, res) => {
    const newShirt = new Shirt({...req.body, owner: req.user._id });

    try {
        await newShirt.save();
        res.status(200).send({ newShirt })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/:id', auth, async(req, res) => {
    try {
        const shirt = await Shirt.findById({ _id: req.params.id, owner: req.user._id })
        if (!shirt)
            return res.status(404).send()
        res.status(200).send(shirt)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const shirt = await Shirt.findByIdAndDelete(req.params.id)
        if (!shirt)
            return res.status(404).send()
        res.status(200).send(shirt)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router