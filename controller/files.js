const Files = require('../model/files');
const User = require('../model/userModel');
const path = require('path');

module.exports = {
	index: async (req, res, next) => {
		//console.log(req.cookies.Session)
		try {
			let anonimus = [true,false];
			const files = await Files.find({anonimus});
			res.status(200).json(files);
		}
		catch (e) {
			console.log(e)
		}
	},
	newFiles: async (req, res, next) => {
		let anonimus = false
		if (req.body.anonimus !== undefined) {
			anonimus = true;
		}
		const { comment } = req.body;
		const urlPhoto = "upload/" + req.file.filename;
		const datePost = new Date();
		let extension = "";

		var _id=req.cookies.Session;
		const userFetch = await User.findById({_id});
		let user = userFetch.user;
		//console.log(user);

		if (path.extname(req.file.originalname) === ".mp4") {
			extension = "video";
		}
		else if (path.extname(req.file.originalname) === ".mp3") {
			extension = "audio";
		}
		else {
			extension = "image";
		}
		const newFiles = await new Files({ comment, user, anonimus, urlPhoto, extension, datePost });
		const files = await newFiles.save();
		res.status(200).json(files);
	},
	getFiles: async (req, res, next) => {
		const files = await Files.find();
		res.status(200).json(files);
	}/*,
	replaceFiles: async (req, res, next) => {
		const { filesId } = req.params;
		const newFiles = req.body;
		const oldFiles = await Files.findByIdAndUpdate(filesId, newFiles)
		res.status(200).json({ success: true });
	},
	updateFiles: async (req, res, next) => {
		const { filesId } = req.params;
		const newFiles = req.body;
		const oldFiles = await Files.findByIdAndUpdate(filesId, newFiles)
		res.status(200).json({ success: true });
	}*/,
	deleteFiles: async (req, res, next) => {
		const { filesId } = req.params;
		const oldFiles = await Files.findByIdAndRemove(filesId)
		res.status(200).json({ success: true });
	}
};