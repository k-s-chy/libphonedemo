const generateHTML = (validatedObjects) => {
    const handles = {
        title: '',
        firstLine: '',
        secondLine: '',
        thirdLine: '',
        fakeSend: '',
        startAgain: ''
    }

    handles.firstLine = htmlCheckboxLogic(validatedObjects[0], "One")
    handles.secondLine = htmlCheckboxLogic(validatedObjects[1], "Two")
    handles.thirdLine = htmlCheckboxLogic(validatedObjects[2] , 'Three')

    if (validatedObjects.some(e=>e.isValid ===true)){
        handles.title = 'Select numbers to send SMS'

        handles.fakeSend = '<div><textarea rows=5 align="center" style="width: 80%; max-width: 100%;" name="messageToSend" placeholder="Type your message" id="inputTextBox" required ></textarea></div><button id="fakeSend">Fake Send</button>'
    }
    else {
        handles.title = 'ERROR: No Valid Numbers Found'

        handles.startAgain = '<div><h2>NO VALID NUMBERS SUBMITTED </h2></div><a href="/" class="button">Start Again</a></div>'
    }


    return handles

}

const htmlCheckboxLogic = (element, checkID) => {
    if (!element){
        return ''
    }
    
    else if(element.isValid ===true){
        return '<tr height = "50px" ><td align="center" style="background-color: lightgrey"><label for="lineOne">' + element.formattedNumber +  '</label> </td><td id="checkColumn'+ checkID+ '" align="center"style="background-color: lightgreen"><input type="checkbox" id="checkbox'+checkID+'" name="check" value="' + element.formattedNumber  +'"></td><td id="sentColumn'+ checkID+ '" hidden align="center" style="background-color: lightgreen">SENT</td></tr>'
    }

    else if(element.isValid ===false){
        return '<tr height = "50px" ><td align="center" style="background-color: lightgrey"><p>' + element.inputtedNumber +  '</p> </td><td  align="center" style="background-color: #FF7F7F ">INVALID</td></tr><tr height = "50px"><td colspan="2" align="center" style="background-color: #FF7F7F">' + element.invalidReason +  '</td></tr>'
    }
}


module.exports = generateHTML