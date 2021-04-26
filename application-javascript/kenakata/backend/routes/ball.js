const express = require('express')
const router = express.Router();
const Ball = require('../models/ball.model')
const auth = require('../middleware/auth')

router.use(express.json())

router.route('/').get((req, res) => {
    Ball.find()
        .then(balls => res.json(balls))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', auth, async(req, res) => {
    const newBall = new Ball({...req.body, owner: req.user._id });

    try {
        await newBall.save();
        res.status(200).send({ newBall })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/:id', auth, async(req, res) => {
    try {
        const ball = await Ball.findById({ _id: req.params.id, owner: req.user._id })
        if (!ball)
            return res.status(404).send()
        res.status(200).send(ball)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const ball = await Ball.findByIdAndDelete(req.params.id)
        if (!ball)
            return res.status(404).send()
        res.status(200).send(ball)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router