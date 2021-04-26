const express = require('express')
const router = express.Router();
const Jacket = require('../models/jacket.model')
const auth = require('../middleware/auth')

router.use(express.json())

router.route('/').get((req, res) => {
    Jacket.find()
        .then(jackets => res.json(jackets))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add', auth, async(req, res) => {
    console.log(req.body)
    const newJacket = new Jacket({...req.body, owner: req.user._id });
    try {
        console.log(newJacket)
        await newJacket.save().then(async function(result) {
            res.status(200).send({ newJacket })
        }).catch((error) => {});


    } catch (e) {
        res.status(400).send(e);
    }
})

/*
.then(async function (result) {
}).catch((error) => {
                                    console.log('Failed to save');
                                    console.log(error);
                                    res.render('test.hbs', {
                                        alert_name: 'danger',
                                        alert_msg_visibility: 'visible',
                                        SorF: 'Failure!',
                                        status: 'Failed to save follow'
                                    });
                                });
*/

router.get('/:id', auth, async(req, res) => {
    try {
        const jacket = await Jacket.findById({ _id: req.params.id, owner: req.user._id })
        if (!jacket)
            return res.status(404).send()
        res.status(200).send(jacket)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const jacket = await Jacket.findByIdAndDelete(req.params.id)
        if (!jacket)
            return res.status(404).send()
        res.status(200).send(jacket)

    } catch (e) {
        res.status(400).send()
    }
})
module.exports = router