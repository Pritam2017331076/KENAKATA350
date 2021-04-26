const express = require('express')
const router = express.Router();
const Football = require('../models/football.model')
const auth = require('../middleware/auth')

router.use(express.json())

router.route('/').get((req, res) => {
    Football.find()
        .then(footballs => res.json(footballs))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', auth, async(req, res) => {
    const newFootball = new Football({...req.body, owner: req.user._id });

    try {
        await newFootball.save();
        res.status(200).send({ newFootball })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/:id', auth, async(req, res) => {
    try {
        const football = await Football.findById({ _id: req.params.id, owner: req.user._id })
        if (!football)
            return res.status(404).send()
        res.status(200).send(football)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const football = await Football.findByIdAndDelete(req.params.id)
        if (!football)
            return res.status(404).send()
        res.status(200).send(football)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router