const express = require('express')
const router = express.Router();
const Bulb = require('../models/bulb.model')
const auth = require('../middleware/auth')

router.use(express.json())

router.route('/').get((req, res) => {
    Bulb.find()
        .then(bulbs => res.json(bulbs))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', auth, async(req, res) => {
    const newBulb = new Bulb({...req.body, owner: req.user._id });

    try {
        await newBulb.save();
        res.status(200).send({ newBulb })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/:id', auth, async(req, res) => {
    try {
        const bulb = await Bulb.findById({ _id: req.params.id, owner: req.user._id })
        if (!bulb)
            return res.status(404).send()
        res.status(200).send(bulb)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const bulb = await Bulb.findByIdAndDelete(req.params.id)
        if (!bulb)
            return res.status(404).send()
        res.status(200).send(bulb)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router