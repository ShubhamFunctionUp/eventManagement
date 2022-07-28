const EventModel = require('../model/eventModel')
const validator = require('../validator/validator')

const createEvent = async function(req,res){
    try {
        let reqBody = req.body;
        let {name,description,eventDate,createdBy,invitees} = reqBody;
        
        if(!validator.isValid(name)){
            return res.status(400).send({
                status: false,
                msg: "Please insert inside the name"
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


const inviteToEvent = async (req,res)=>{
    try {
        let reqBody = req.body;
       let {invitees,eventName} = reqBody; 
       
       if(invitees.length<=0){
        return res.status(400).send({status:"failure",msg:"Nothing is present inside the invited user"})
       }

       if(!validator.isValid(eventName)){
        return res.status(400).send({status:"failure",msg:"Enter valid event name"})
       }

       let isEventThere = await EventModel.findOne({name:eventName});

       if(!isEventThere){
        return res.status(400).send({status:"failure",msg:"Event is not there"})
       }

      


       let inviteUser= await EventModel.findOneAndUpdate({name:eventName},{$set:{invitees:[invitees]}},{new:true})

       return res.status(200).send({status:"Success",data:inviteUser});



    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}


const getEvent = async function(req,res){

    try {
        
        let obj = {}
        let date = req.query.date;
        let name = req.query.name;

        if(date){
            obj.date = date
        }

        if(name){
            obj.name = { $regex: name }
        }



        let event = await EventModel.find(obj).limit(10).sort({date:1})
        console.log(event);
        return res.status(200).send({status:"Success",data:event});

    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }

}


module.exports.getEvent = getEvent
module.exports.inviteToEvent=inviteToEvent
module.exports.createEvent  = createEvent
