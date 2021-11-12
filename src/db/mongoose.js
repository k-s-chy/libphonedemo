const mongoose = require('mongoose')
const chalk = require('chalk')

mongoose.connect('mongodb://127.0.0.1:27017/mobile-database', {}).then(() => {
    console.log(chalk.green.inverse('connected'))
})
.catch(() => {
    console.log(console.log(chalk.red('ERROR')))
})

