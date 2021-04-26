const express = require('express')
const router = express.Router();
const Tubelight = require('../models/tubelight.model')
const auth = require('../middleware/auth')

router.use(express.json())

router.route('/').get((req, res) => {
    Tubelight.find()
        .then(tubelights => res.json(tubelights))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', auth, async(req, res) => {
    const newTubelight = new Tubelight({...req.body, owner: req.user._id });

    try {
        await newTubelight.save();
        res.status(200).send({ newTubelight })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/:id', auth, async(req, res) => {
    try {
        const tubelight = await Tubelight.findById({ _id: req.params.id, owner: req.user._id })
        if (!tubelight)
            return res.status(404).send()
        res.status(200).send(tubelight)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const tubelight = await Tubelight.findByIdAndDelete(req.params.id)
        if (!tubelight)
            return res.status(404).send()
        res.status(200).send(tubelight)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router