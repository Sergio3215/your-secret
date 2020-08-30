const express = require('express')
const router = express.Router()


const {
	logout,
	login,
	newUser,
	getUser,
	replaceUser,
	deleteUser
} = require('../controller/userControllers');

router.get("/", login);

router.post("/", newUser);

router.get("/:userId", getUser);

router.put("/:userId", replaceUser);

router.delete("/:userId", deleteUser);

module.exports = router;