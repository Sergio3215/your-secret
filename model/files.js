const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
	comment:String,
	user:String,
	anonimus:Boolean,
	urlPhoto: String,
	extension: String,
	datePost: Date
});

console.log(fileSchema)

module.exports = mongoose.model('Files', fileSchema);