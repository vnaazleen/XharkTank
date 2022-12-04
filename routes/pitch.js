const express = require('express')
const Offer = require('../model/offer')
const router = express.Router()

// Importing Tables
const Pitch = require('../model/pitch')

// Importing Helper functions
const validatePitchId = require('./validations')
const {filterPitch, filterPitches} = require('./filters')

// 1. Endpoint to post a pitch to the backend
router.post('/', async (req, res) => {
    let id = await Pitch.count({}) + 1
    const newPitch = new Pitch({
        id: id,
        entrepreneur: req.body.entrepreneur,
        pitchTitle: req.body.pitchTitle,
        pitchIdea: req.body.pitchIdea,
        askAmount: req.body.askAmount,
        equity: req.body.equity,
        createdAt: Date.now(),
        offers: []
    })

    await newPitch.save((err, pitch) => {
        if (err) {
            return res.status(400).send("Invalid request body")
        } else {
            return res.status(201).send({ id: pitch.id })
        }
    })
})

// 2. Endpoint to make a counter offer for a pitch to the backend
router.post('/:pitchId/makeOffer', validatePitchId, async (req, res) => {
    const pitch = await Pitch.findOne({ id: req.params.pitchId })
    const id = pitch.offers.length + 1

    const newOffer = new Offer({
        id: id,
        investor: req.body.investor,
        amount: req.body.amount,
        equity: req.body.equity,
        comment: req.body.comment,
    })

    await newOffer.save(async (err, offer) => {
        if (err) {
            return res.status(400).send("Invalid Request Body")
        } else {
            console.log(req.params.pitchId)
            Pitch.findOne({ id: req.params.pitchId }, async (err, pitch) => {
                if (err) console.log(err)
                else {
                    await pitch.offers.push(offer)
                    await pitch.save()
                }
            })

            return res.status(201).send({id: newOffer.id})
        }
    });
})

// 3. Endpoint to fetch the all the pitches in the reverse chronological order ( i.e. last created one first ) from the backend
router.get('/', async (req, res) => {
    await Pitch.find().sort({createdAt: 'desc'}).populate("offers").exec((err, pitches) => {
        if (err) console.log(err)
        else {
            return res.status(200).send(JSON.stringify(filterPitches(pitches)))
        }
    })
})


// 4. Endpoint to specify a particular id (identifying the pitch) to fetch a single Pitch.
router.get('/:pitchId', validatePitchId, async (req, res) => {
    await Pitch.findOne({id: req.params.pitchId}).populate("offers").exec((err, pitch) => {
        if (err) console.log(err)
        else {
            return res.status(200).send(JSON.stringify(filterPitch(pitch)))
        }
    })
})

module.exports = router