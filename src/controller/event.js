const EventModel = require('../model/eventModel')
const validator = require('../validator/validator')

const createEvent = async function(req,res){
    try {
        let reqBody = req.body;
        let {title,description,eventDate,createdBy,invitees} = reqBody;
        
        if(!validator.isValid(title)){
            return res.status(400).send({
                status: false,
                msg: "Please insert inside the title"
            })
        }

        if(!validator.isValid(description)){
            return res.status(400).send({
                status: false,
                msg: "Please insert inside the description"
            })
        }

        if(!validator.isValid(eventDate)){
            return res.status(400).send({
                status: false,
                msg: "Please insert inside the eventDate"
            })
        }
        
        
        if(!validator.isValidObjectId(createdBy)){
            return res.status(400).send({
                status: false,
                msg: "Please insert valid object of User"
            })
        }

        if(invitees.length<=0){
            return res.status(400).send({
                status: false,
                msg: "Please insert invitees details"
            })
        }

        let eventCreated = await EventModel.create(reqBody);

        return res.status(201).send({success:true,data:eventCreated});

    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}





module.exports.createEvent  = createEvent
