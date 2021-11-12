console.log('js is loaded')

const form = document.querySelector('form')
const values = document.getElementsByName('numberInput')


// function checkOne() {
//     if(document.getElementById('firstInput').value != "")
//         document.getElementById('secondInput').disabled = false;
//     else
//         document.getElementById('secondInput').disabled = true;
//     }

// function checkTwo() {
//     if(document.getElementById('secondInput').value != "")
//         document.getElementById('thirdInput').disabled = false;
//     else
//         document.getElementById('thirdInput').disabled = true;
//     }


function validateForm() {
    if ((document.getElementById('firstInput').value === document.getElementById('secondInput').value )|| ((document.getElementById('secondInput').value === document.getElementById('thirdInput').value) && (!document.getElementById('firstInput').value!=""))|| (document.getElementById('firstInput').value === document.getElementById('thirdInput').value) ) {
        alert("Duplicate Numbers Entered");
    return false;
    }
}


// form.addEventListener('submit', (e)=> {
//     e.preventDefault()
//     console.log('Successfull worked' + document.getElementById('secondInput').value)
//     // console.log(values.map(x=> x))
//     console.log(document.getElementById('thirdInput').value)
// })

