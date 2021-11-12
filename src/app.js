const path = require('path')
const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')
const taskRouter = require('./routers/task')
const validator = require('./utils/validator')
const htmlGenerator = require('./utils/htmlGenerator')
const Validnumber = require('./models/validnumber')
const sendFakeMessage = require('./utils/sendFakeMessage')
const MessageHistory = require('./models/messageHistory')
const timeDate = require('./utils/timeDate')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(taskRouter)
app.use(express.urlencoded())

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'LibPhonenumber Validator Demo',
    })
})

app.get('/history', (req,res) => {
    MessageHistory.find((err, docs) => {
        const reverse = docs.reverse()
        const times = timeDate.times(reverse)
        const dates = timeDate.dates(reverse)

        for (let i = 0; i < docs.length; i++) {
            reverse[i].time = times[i];
            reverse[i].date = dates[i];
          }

        if (!err) {
            res.render("messageHistory", {
                title: 'Message',
                list: reverse               
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });})

app.get('/validated', (req,res) => {
    Validnumber.find((err, docs) => {
        if (!err) {
            res.render("validatedNumbers", {
                title: 'Validated Numbers',
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
})

app.post('/', (req,res)=>{
    
    arr = req.body.numberInput
    const filteredArr = arr.filter(e=>e)
    const validatedObjects = filteredArr.map(x => validator.validatePhone(x))
    const htmlCode = htmlGenerator(validatedObjects)

    res.render('checkMessages', {
        title: htmlCode.title,
        firstCheck: htmlCode.firstLine, 
        secondCheck:htmlCode.secondLine,
        thirdCheck:htmlCode.thirdLine,
        fakeSend: htmlCode.fakeSend,
        startAgain: htmlCode.startAgain
    })

})

app.post('/fakesend', (req,res) => {
    if (req.body.check.constructor === Array){
        req.body.check.forEach(element => {
            sendFakeMessage(element, req.body.messageToSend)        
        });
    } else {
        sendFakeMessage(req.body.check, req.body.messageToSend)
    }
})





// app.post('/fakesend', (req,res) => {
//     if (req.body.check.isArray()){ 
//         req.body.check.forEach(element => {
//         console.log(element)}
//     }else {
//         console.log(req.body.check)
//     }

//     });



    // res.render('messageHistory')




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

