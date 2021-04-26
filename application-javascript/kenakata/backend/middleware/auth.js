const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Jacket = require('../models/jacket.model')
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = await jwt.verify(token, 'thisisnewuser')
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token })
        if (!user)
            throw new Error()
        req.token = token
        req.user = user
        next();
    } catch (e) {
        res.status(403).send({ error: "error in Authentication" })
    }
}

module.exports = auth