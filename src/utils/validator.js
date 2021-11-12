const libphonenumber = require('libphonenumber-js/max')
const ValidNumber = require('../models/validnumber')

const validatePhone = (phoneNumberItem) => {
    const p = parsePhone(phoneNumberItem, 'GB')
    if (p.isValid === false){
        return p
    } else if (p.isValid()==false) {
         const object = {
            inputtedNumber: phoneNumberItem,
            isValid: false,
            invalidReason: 'This is not a possible number',
        } 
        return object

    }   else if (!(p.getType() === 'MOBILE')){
            saveFunction(p)
            const object = {
                inputtedNumber: phoneNumberItem,
                isValid: false,
                invalidReason: 'This is not a mobile, the number type is: ' + p.getType(),
            } 
            return object

    } else {
        saveFunction(p)
        const object = {
            inputtedNumber: phoneNumberItem,
            isValid: true,
            formattedNumber: (p.countryCallingCode== 44) ? p.formatNational() : p.formatInternational(),
            e164Number: p.number
        }
        return object
    }

}

const parsePhone =  (a,b) => {
    try {
        const phoneNumber = libphonenumber.parsePhoneNumberWithError(a, b)
        return phoneNumber
      } catch (error) {
        if (error instanceof libphonenumber.ParseError) {
          // Not a phone number, non-existent country, etc.
          const object = {
              inputtedNumber: a,
              isValid: false,
              invalidReason: 'Invalid number as it is: ' + error.message
          }
          return object
        } else {
          throw error
        }
      }
}


const saveFunction = (p) => {

if(p.countryCallingCode ==44){
    let query = {e164Number: p.number};
    let update = {
        $setOnInsert:{
            formattedNumber: p.formatNational(), 
            e164Number: p.number,
            numberType: p.getType(),
            countryCode: p.country

        }
    };

    let options = {upsert: true};
    ValidNumber.findOneAndUpdate(query, update, options).catch(error=>console.log(error))
}
else {
    let query = {e164Number: p.number};
    let update = {
        $setOnInsert:{
            formattedNumber: p.formatInternational(), 
            e164Number: p.number,
            numberType: p.getType(),
            countryCode: p.country

        }
    };

    let options = {upsert: true};
    ValidNumber.findOneAndUpdate(query, update, options).catch(error=>console.log(error))
}
}


 

module.exports = {validatePhone}

