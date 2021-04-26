const express = require('express')
const router = express.Router();
const User = require('../models/user.model')
const auth = require('../middleware/auth')

router.use(express.json())
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/me', auth, async(req, res) => {
    try {
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


router.post('/add', async(req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    try {
        User.findOne({ user: user }, function(err, user) {
            console.log(user);
            if (user) console.log('fine one lol')
                /* if (err) return res.redirect('/signupform') */

            if (user) {
                console.log('just stop it')
                console.log('This user is used')
                return
            }
        })
    } catch {
        console.log('user is used')
    }

    const newUser = new User({ user, email, password });

    try {
        const token = await newUser.generateAuthToken();
        res.status(200).send({ newUser, token })
    } catch (e) {
        res.status(400).send(e);
    }
})

router.route('/login').post(async(req, res) => {
    try {
        const userr = await User.findByCredentials(req.body.user, req.body.password)
        const token = await userr.generateAuthToken()
        res.status(200).send({ userr, token })
    } catch (e) {
        res.status(400).json(e)
    }
})

router.get('/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
            //req.user.tokens = []
        await req.user.save();
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', async(req, res) => {
    console.log(req.params)
    try {
        const user = await User.findById(req.params.id)
        if (!user)
            return res.status(404).send()
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


router.delete('/:id', async(req, res) => {
    try {
        const userr = await User.findByIdAndDelete(req.params.id)
        if (!userr)
            return res.status(404).send()
        res.status(200).send(userr)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router;