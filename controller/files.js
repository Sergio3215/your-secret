const Files = require('../model/files');
const User = require('../model/userModel');
const path = require('path');
const socket = require("../socket").socket;

module.exports = {
	index: async (req, res, next) => {
		//console.log(req.cookies.Session)
		try {
			let anonimus = [true, false];
			const files = await Files.find({ anonimus }).sort({ datePost: -1 });

			if (req.cookies.Session !== undefined) {
				var _id = req.cookies.Session;
				const userFetch = await User.findById({ _id });
				let user = userFetch.user;
				for (var kk = 0; kk < files.length; kk++) {
					files[kk].loginUser = user;
				}
			}

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
		let urlPhoto = "";
		let extension = "";
		try {
			urlPhoto = "upload/" + req.file.filename;

			if (path.extname(req.file.originalname) === ".mp4") {
				extension = "video";
			}
			else if (path.extname(req.file.originalname) === ".mp3") {
				extension = "audio";
			}
			else {
				extension = "image";
			}
		}
		catch (e) {

		}
		const datePost = new Date();
		var _id = req.cookies.Session;
		const userFetch = await User.findById({ _id });
		let user = userFetch.user;
		const like = false;
		const loginUser = "";
		
		const newFiles = await new Files({ comment, user, loginUser, anonimus, urlPhoto, extension, datePost, like });
		const files = await newFiles.save();

		//User of login
		files.loginUser = user;
		
		//websocket
		socket.io.emit('fileUpdate', files);
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