const express = require('express');
const router = express();
const UserController = require('../controller/user')
const EventController = require('../controller/event')
router.get('/',async ()=>(console.log("router")))

//   ------------------------------------- User-------------------------------------------------------
router.post('/registration',UserController.createUser)
router.post('/login',UserController.login)
router.post('/logout',UserController.logout)
router.put('/changePassword',UserController.changePassword)
router.put('/updatePassword',UserController.updatePassword)

// -------------------------Event------------------------------------------------------------------------

router.post('/eventCreated',EventController.createEvent)



module.exports = router