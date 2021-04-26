const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamp: true
});

const Bulb = mongoose.model('Bulb', productSchema)

module.exports = Bulb