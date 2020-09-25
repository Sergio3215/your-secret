const express = require('express')
const router = express.Router()


const {
	index,
	newFiles,
	getFiles,
	replaceFiles,
	deleteFiles,
	likes,
	profile
} = require('../controller/files');

router.get("/", index);

router.get("/:user", profile);

router.post("/", newFiles);

//router.get("/", getFiles);
router.put("/", replaceFiles);

router.put("/:filesId", likes);

router.delete("/:filesId", deleteFiles);

module.exports = router;