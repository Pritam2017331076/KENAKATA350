const express = require('express')
const router = express.Router();
const Fan = require('../models/fan.model')
const auth = require('../middleware/auth')

router.use(express.json())

router.route('/').get((req, res) => {
    Fan.find()
        .then(fans => res.json(fans))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', auth, async(req, res) => {
    const newFan = new Fan({...req.body, owner: req.user._id });

    try {
        await newFan.save();
        res.status(200).send({ newFan })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/:id', auth, async(req, res) => {
    try {
        const fan = await Fan.findById({ _id: req.params.id, owner: req.user._id })
        if (!fan)
            return res.status(404).send()
        res.status(200).send(fan)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const fan = await Fan.findByIdAndDelete(req.params.id)
        if (!fan)
            return res.status(404).send()
        res.status(200).send(fan)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router