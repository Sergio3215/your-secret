const Files = require('../model/files');
const User = require('../model/userModel');
const path = require('path');
const { ifError } = require('assert');
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
			//console.log(e)
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
		const liked = [{}]
		const newFiles = await new Files({ comment, user, loginUser, anonimus, urlPhoto, extension, datePost, like, liked });
		const files = await newFiles.save();
		//console.log(files);

		//User of login
		files.loginUser = user;

		//websocket
		socket.io.emit('fileUpdate', files);
		res.status(200).json(files);
	},
	getFiles: async (req, res, next) => {
		var _id = req.cookies.Session;
		const userFetch = await User.findById({ _id });
		let user = userFetch.user;
		
		const files = await Files.find();
		files.loginUser = user;
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
	likes: async (req, res, next) => {
		const { filesId } = req.params;
		const { like } = req.body;

		var _id = req.cookies.Session;
		const userFetch = await User.findById({ _id });
		let user = userFetch.user;
		let files = await Files.findById(filesId);
		//console.log(like)
		if (like) {
			if (files.liked.length > 0) {
				//console.log(files.liked[0].user)
				if (files.liked[0].user === undefined) {
					files.liked = [{
						user: user
					}]
				}
				else {
					files.liked.push({
						user: user
					})
				}
			}
			else {
				files.liked = [{
					user: user
				}]
			}
		}
		else {
			for (var ii = 0; ii < files.liked.length; ii++) {
				if (files.liked[ii].user === user) {
					//console.log("delete")
					files.liked.splice(ii,1);
					break;
				}
			}
		}

		let liked = files.liked;

		const oldFiles = await Files.findByIdAndUpdate(filesId, { like, liked })
		//console.log(oldFiles);
		
		//websocket
		socket.io.emit('likeUpdate', like, liked, oldFiles._id);

		res.status(200).json({ success: true });
	},
	deleteFiles: async (req, res, next) => {
		const { filesId } = req.params;
		const oldFiles = await Files.findByIdAndRemove(filesId)
		res.status(200).json({ success: true });
	}
};