const Files = require('../model/files');
const Comment = require('../model/comment');
const User = require('../model/userModel');
const path = require('path');
const socket = require("../socket").socket;
let cloudinary = require('../cloudinary');
const fs = require('fs-extra')

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
		let public_Id = "";
		try {

			if (path.extname(req.file.originalname) === ".mp4") {
				extension = "video";
			}
			else if (path.extname(req.file.originalname) === ".mp3") {
				extension = "audio";
			}
			else {
				extension = "image";
			}

			var result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });

			public_Id = result.public_id;
			console.log(result.url)
			fs.unlink(req.file.path)
			//console.log(req.file)

			urlPhoto = result.url;
			//urlPhoto = "upload/" + req.file.filename;
		}
		catch (e) {
			//console.log(e)
		}
		const datePost = new Date();
		var _id = req.cookies.Session;
		const userFetch = await User.findById({ _id });
		let user = userFetch.user;
		const like = false;
		const loginUser = "";
		const idUser = _id;
		const liked = [{}]
		const newFiles = await new Files({ comment, user, loginUser, idUser, anonimus, urlPhoto, extension, public_Id, datePost, like, liked });
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
	},
	replaceFiles: async (req, res, next) => {
		console.log(req.query);
		const { _id, comment, anonimus } = req.query;

		const newFiles = req.body;
		const oldFiles = await Files.findByIdAndUpdate(_id, { comment, anonimus })
		res.status(200).json({ success: true });
	}/*,
	updateFiles: async (req, res, next) => {
		const { filesId } = req.params;
		const newFiles = req.body;
		const oldFiles = await Files.findByIdAndUpdate(filesId, newFiles)
		res.status(200).json({ success: true });
	}*/,
	profile: async (req, res, next) => {
		var { user } = req.params;
		var anonimus = false;
		const files = await Files.find({ anonimus, user });
		//console.log(req.cookies.Session)
		try {
			var _id = req.cookies.Session;
			const userFetch = await User.findById({ _id });
			user = userFetch.user;
		}
		catch (e) {
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
		const oldFiles = await Files.findByIdAndRemove(filesId);

		try{
			if(oldFiles.public_Id !== ""){
				var public_id = oldFiles.public_Id;
				//console.log(oldFiles)
				const result =  await cloudinary.uploader.destroy(public_id, { resource_type: "auto" });
				//console.log(result)
			}
		}
		catch(e){

		}

		const fileId = filesId;
		const comment = await Comment.find({ fileId });
		//console.log(comment)
		for (var ii = 0; ii < comment.length; ii++) {
			//console.log(comment[ii]._id)
			let oldComment = await Comment.findByIdAndRemove(comment[ii]._id);
		}

		socket.io.emit('deletedPost', filesId);

		res.status(200).json({ success: true });
	}
};