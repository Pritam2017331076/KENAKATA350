const express = require('express')
const router = express.Router();
const Saree = require('../models/saree.model')
const auth = require('../middleware/auth')

router.use(express.json())

router.route('/').get((req, res) => {
    Saree.find()
        .then(sarees => res.json(sarees))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', auth, async(req, res) => {
    const newSaree = new Saree({...req.body, owner: req.user._id });

    try {
        console.log(newSaree)
        await newSaree.save();
        res.status(200).send({ newSaree })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/:id', auth, async(req, res) => {
    try {
        const saree = await Saree.findById({ _id: req.params.id, owner: req.user._id })
        if (!saree)
            return res.status(404).send()
        res.status(200).send(saree)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const saree = await Saree.findByIdAndDelete(req.params.id)
        if (!saree)
            return res.status(404).send()
        res.status(200).send(saree)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router