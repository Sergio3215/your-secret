const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	user: String,
	password: String,
	name: String,
	email:String,
	date:Date
});

module.exports = mongoose.model('User', userSchema);