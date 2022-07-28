const mongoose = require('mongoose');
let moment = require('moment')
let now = moment()
const EventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    eventDate:{
        type: String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    invitees:[{
        invitee:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        invitedAt:{
            type: Date,
            default:Date.now()
        }
    }]
},{timestamps:true})

module.exports = mongoose.model('Event',EventSchema)