const express = require('express')
const router = express.Router()


const {
	profile
} = require('../controller/profile');

router.get("/:user", profile);

module.exports = router;