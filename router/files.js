const express = require('express')
const router = express.Router()


const {
	index,
	newFiles,
	getFiles/*,
	replaceFiles*/,
	deleteFiles
} = require('../controller/files');

router.get("/", index);

router.post("/", newFiles);

//router.get("/", getFiles);
/*
router.put("/:filesId", replaceFiles);*/

router.delete("/:filesId", deleteFiles);

module.exports = router;