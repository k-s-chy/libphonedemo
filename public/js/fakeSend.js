console.log('Client side js loaded up')

const checkForm = document.querySelector('form')
const search = document.querySelector('input')
const checkColumns = [document.getElementById('checkColumnOne'),document.getElementById('checkColumnTwo'),document.getElementById('checkColumnThree')]
const sentColumns = [document.getElementById('sentColumnOne'),document.getElementById('sentColumnTwo'),document.getElementById('sentColumnThree')]
const checkboxes = [document.getElementById("checkboxOne"),document.getElementById("checkboxTwo"),document.getElementById("checkboxThree")]

// const checkboxOne = document.getElementById("checkboxOne")
// const checkboxTwo = document.getElementById("checkboxTwo")
// const checkboxThree = document.getElementById("checkboxThree")


checkForm.addEventListener('submit', (e) => {
    // e.preventDefault()
    // for (let i = 0; i < 4; i++) {
    //     console.log(checkboxes[i])
    //     console.log(checkColumns[i])
    //     console.log(sentColumns[i])
    // }
    for (let i = 0; i < 3; i++) {
        if (checkboxes[i].checked){
            checkColumns[i].hidden=true;
            sentColumns[i].hidden = false;
        }
      }

    // // checkColumn.hidden = true;
    // sentColumn.hidden = false;
    
    // fetch('/weather?address=' + search.value).then((response) => {
    //     response.json().then((data) => {
    //         if (data.error) {
    //             return messageOne.textContent = data.error
    //         }
    //         messageOne.textContent = 'Temperature for ' + data.location + ' is ' + data.temperature
    //         messageTwo.textContent = label.values()


    //     })
    // })
})