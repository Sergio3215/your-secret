const Files = require('../model/files');
const User = require('../model/userModel');
const path = require('path');
const socket = require("../socket").socket;

module.exports = {
	profile: async (req, res, next) => {
		var {user} = req.params;

		const files = await Files.find({user});
		//console.log(files);
		var post = [{
			post:0,
			anonymus:0
		}];
		for(var ii = 0; ii<files.length;ii++){
			if(files[ii].anonimus){
				post[0].anonymus++
			}
			else{
				post[0].post++
			}
		}
		console.log(post)
		res.status(200).json(post);
	}
};