const express = require('express');
const router = express();
router.get('/',async ()=>(console.log("router")))

module.exports = router