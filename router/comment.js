const express = require('express')
const router = express.Router()


const {
	index,
	newFiles,
	/*getFiles,
	replaceFiles,
	deleteFiles,
	likes,
	profile*/
} = require('../controller/comment');

router.get("/:fileId", index);

// router.get("/", profile);

router.post("/:fileId", newFiles);

/*//router.get("/", getFiles);
router.put("/", replaceFiles);

router.put("/:filesId", likes);

router.delete("/:filesId", deleteFiles);*/

module.exports = router;