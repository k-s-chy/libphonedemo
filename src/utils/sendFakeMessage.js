const Validnumber = require('../models/validnumber')
const validator = require('./validator')
const MessageHistory = require ('../models/messageHistory')


const sendFakeMessage = async (number, messageToSend) => {
    const numberObject = validator.validatePhone(number)
    const numberFromDB = await Validnumber.findOneAndUpdate({e164Number : numberObject.e164Number}, {$inc : {messageCount : 1}}, {new:true})
    const messageCountOrdinal = findOrdinal(numberFromDB.messageCount)
    const finalMessage = 'The following is the ' + messageCountOrdinal + ' message sent to you: ' + messageToSend
    
    const savedMessage = new MessageHistory ({formattedNumber:numberObject.formattedNumber, message: finalMessage})

    savedMessage.save()

}


const findOrdinal = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

module.exports = sendFakeMessage