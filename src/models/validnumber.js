const mongoose = require('mongoose')
const validNumberSchema = new mongoose.Schema({
    formattedNumber: {
        type: String,
        required: true,
    },
    e164Number: {
        type: String,
        required: true,
    },
    numberType: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
        required: true,
    },
    messageCount: {
        type: Number,
        default: 0
    }
})

const ValidNumber = mongoose.model('ValidNumber', validNumberSchema)


module.exports = ValidNumber