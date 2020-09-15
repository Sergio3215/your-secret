const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
	comment:String,
	user:String,
	loginUser:String,
	anonimus:Boolean,
	urlPhoto: String,
	extension: String,
	datePost: Date,
	like:Boolean,
	liked:[{
		user:String
	}]
});

console.log(fileSchema)

module.exports = mongoose.model('Files', fileSchema);