const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
	comment: String,
	user: String,
	loginUser: String,
	idUser: String,
	anonimus: Boolean,
	urlPhoto: String,
	extension: String,
	public_Id: String,
	datePost: Date,
	like: Boolean,
	liked: [{
		user: String
	}]
});

console.log(fileSchema)

module.exports = mongoose.model('Files', fileSchema);