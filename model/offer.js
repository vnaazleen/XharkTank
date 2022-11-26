const mongoose = require('mongoose')
const { Schema, model } = mongoose 

const offerSchema = new Schema({
    id: { type: Number, required: true },
    investor: { type: String, required: true },
    amount: { type: Number, required: true },
    equity: { type: Number, required: true, min: 0, max: 100 },
    comment: { type: String, required: true },
})

const Offer = model('Offer', offerSchema)
module.exports = Offer