const Comment = require('../model/comment');
const User = require('../model/userModel');
const path = require('path');
const socket = require("../socket").socket;

module.exports = {
	index: async (req, res, next) => {
		//console.log(req.cookies.Session)
		let comment=[{}];
		try {
			var {fileId} = req.params;
			comment = await Comment.find({fileId}).sort({ datePost: -1 });
			if (req.cookies.Session !== undefined) {
				var _id = req.cookies.Session;
				const userFetch = await User.findById({ _id });
				let user = userFetch.user;
				for (var kk = 0; kk < comment.length; kk++) {
					comment[kk].loginUser = user;
				}
			}

			res.status(200).json(comment);
		}
		catch (e) {
			console.log(e)
			res.status(200).json([]);
		}
	},
	newFiles: async (req, res, next) => {
		var { fileId } = req.params;
		console.log(req.body)
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
		const dateComment = new Date();
		var _id = req.cookies.Session;
		const userFetch = await User.findById({ _id });
		let user = userFetch.user;
		const like = false;
		const loginUser = "";
		const idUser = _id;
		const liked = [{}]
		const newFiles = await new Comment({ comment, fileId, user, loginUser, idUser, urlPhoto, extension, dateComment, like, liked });
		const files = await newFiles.save();
		//console.log(files);

		//User of login
		files.loginUser = user;

		//websocket
		socket.io.emit('commentUpdate:', files, fileId);
		res.status(200).json(files);
	},
	/*getFiles: async (req, res, next) => {
		var _id = req.cookies.Session;
		const userFetch = await User.findById({ _id });
		let user = userFetch.user;

		const files = await Files.find();
		files.loginUser = user;
		res.status(200).json(files);
	},
	replaceFiles: async (req, res, next) => {
		console.log(req.query);
		const {_id, comment, anonimus} = req.query;
		
		const newFiles = req.body;
		const oldFiles = await Files.findByIdAndUpdate(_id, {comment, anonimus})
		res.status(200).json({ success: true });
	},
	updateFiles: async (req, res, next) => {
		const { filesId } = req.params;
		const newFiles = req.body;
		const oldFiles = await Files.findByIdAndUpdate(filesId, newFiles)
		res.status(200).json({ success: true });
	},
	/*profile: async (req, res, next) => {
		var { user } = req.params;
		var anonimus = false;
		const files = await Files.find({ anonimus, user });
		//console.log(req.cookies.Session)
		try {
			var _id = req.cookies.Session;
			const userFetch = await User.findById({ _id });
			user = userFetch.user;
		}
		catch(e) {
			user = "";
		}

		for (var ii = 0; ii < files.length; ii++) {
			files[ii].loginUser = user;
		}

		//console.log(files)
		res.status(200).json(files);
	},
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
					files.liked.splice(ii, 1);
					break;
				}
			}
		}

		let liked = files.liked;

		const oldFiles = await Files.findByIdAndUpdate(filesId, { like, liked })
		//console.log(oldFiles);

		//websocket
		socket.io.emit('likeUpdate', liked, oldFiles._id, user, _id);

		res.status(200).json({ success: true });
	},
	deleteFiles: async (req, res, next) => {
		const { filesId } = req.params;
		const oldFiles = await Files.findByIdAndRemove(filesId)
		res.status(200).json({ success: true });
	}*/
};