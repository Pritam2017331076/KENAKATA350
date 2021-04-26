const express = require('express')
const router = express.Router();
const Bat = require('../models/bat.model')
const auth = require('../middleware/auth')

router.use(express.json())

router.route('/').get((req, res) => {
    Bat.find()
        .then(bats => res.json(bats))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', auth, async(req, res) => {
    const newBat = new Bat({...req.body, owner: req.user._id });

    try {
        await newBat.save();
        res.status(200).send({ newBat })
    } catch (e) {
        res.status(400).send(e);
    }
})

/* router.get('/:id', auth, async(req, res) => {
    try {
        const bat = await Bat.findById({ _id: req.params.id, owner: req.user._id })
        if (!bat)
            return res.status(404).send()
        res.status(200).send(bat)
    } catch (e) {
        res.status(400).send()
    }
}) */

router.get('/:id', auth, async(req, res) => {
    try {
        const bat = await Bat.findById({ _id: req.params.id, owner: req.user._id })
        if (!bat)
            return res.status(404).send()
        res.status(200).send(bat)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const bat = await Bat.findByIdAndDelete(req.params.id)
        if (!bat)
            return res.status(404).send()
        res.status(200).send(bat)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router