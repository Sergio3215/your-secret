const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	comment: String,
	fileId: String,
	user: String,
	loginUser: String,
	idUser: String,
	urlPhoto: String,
	extension: String,
	dateComment: Date,
	like: Boolean,
	liked: [{
		user: String
	}]
});

console.log(commentSchema)

module.exports = mongoose.model('Comment', commentSchema);