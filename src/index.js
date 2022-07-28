const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const route = require('./route/route')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


// Establish connection with mongoose
mongoose.connect("mongodb+srv://Shubh9638464483:bI1LiqgUI6ov0Jhb@cluster0.azzwg.mongodb.net/eventManagement?retryWrites=true&w=majority", {
        useNewUrlParser: true
    })
    .then(() => console.log("Mongodb is connected"))
    .catch(err => console.log(err))

app.use('/', route)
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
})