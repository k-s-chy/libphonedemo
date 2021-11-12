const mongoose = require('mongoose')
const messageHistorySchema = new mongoose.Schema({
    formattedNumber: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, { timestamps: { createdAt: 'created_at' } })

const MessageHistory = mongoose.model('MessageHistory', messageHistorySchema)


module.exports = MessageHistory