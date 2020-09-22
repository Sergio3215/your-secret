const User = require('../model/userModel');
const Files = require('../model/files');

module.exports = {
	login: async (req, res, next) => {
		try {
			if (req.query.user !== undefined) {
				req.query.user = req.query.user.toLowerCase()

				const { user, password } = req.query;

				if (user !== undefined
					&& password !== undefined) {
					let users = await User.find({ user, password });
					//console.log(user);
					//console.log(password);
					if (users[0].user === user
						&& users[0].password === password) {
						//res.status(200).json(users);
						res.cookie("Session", users[0].id)
						res.status(200).json(users);
					}
					else {
						users = { msg: 'Error, usuario o contraseña incorrecta' };
						res.status(200).json(users);
					}
				}
				else {
					let users = { msg: 'Error,  tu necesitas escribir un usuario o una contraseña' };
					res.status(200).json(users);
				}
			}
			else {
				const _id = req.cookies.Session;
				const users = await User.findById({ _id });
				res.status(200).json(users);
			}
		}
		catch (e) {
			//console.log(e)
			users = { msg: 'Error, el usuario o contraseña es incorrecto' };
			res.status(200).json(users);
		}
	},
	newUser: async (req, res, next) => {
		try {

			if (req.body.user !== undefined) {
				req.body.user = req.body.user.toLowerCase()
			}

			const { user, password, confirmPassword, name, email } = req.body;
			var date = new Date();
			const emails = await User.find({ email });
			const users = await User.find({ user });
			let newusers = {};
			if (emails.length == 0 && users.length == 0) {
				if (confirmPassword === password) {
					const newUser = await new User({ user, password, name, email });
					//console.log(newUser)
					newusers = await newUser.save();
					res.status(200).json(newusers);
				}
				else {
					newusers = { msg: 'Error, no coincide las contraseñas' };
					res.status(200).json(newusers);
				}
			}
			else {
				newusers = { msg: 'Error, el email esta usado' };
				res.status(200).json(newusers);
			}
		}
		catch (e) {
			console.log(e);
			newusers = { msg: 'Error mientras intentaba crear la cuenta' };
			res.status(200).json(newusers);
		}
	},
	getUser: async (req, res, next) => {
		const { userId } = req.params;
		const users = await User.findById(userId);
		res.status(200).json(users);
	},
	replaceUser: async (req, res, next) => {
		const { userId } = req.params;
		const newUser = req.body;
		//console.log(req.body)
		const oldUser = await User.findById(userId);
		if (newUser.oldPass === oldUser.password) {
			if (newUser.newPass === newUser.reptPass) {
				var newPass = { password: newUser.newPass }
				const oldUser = await User.findByIdAndUpdate(userId, newPass)
				res.status(200).json({ success: true });
			}
			else {
				newusers = { msg: 'Error, no coinciden las contraseñas' };
				res.status(200).json(newusers);
			}
		}
		else {
			newusers = { msg: 'Error, la contraseña ingresada es incorrecta' };
			res.status(200).json(newusers);
		}
	},
	updateUser: async (req, res, next) => {
		const { userId } = req.params;
		const newUser = req.body;
		const oldUser = await User.findByIdAndUpdate(userId, newUser)
		res.clearCookie('Session');
		res.redirect('/');
		/*res.status(200).json({ success: true });*/
	},
	deleteUser: async (req, res, next) => {
		const { userId } = req.params;
		var idUser = userId;
		const files = await Files.find({ idUser });
		for (var ii = 0; ii < files.length; ii++) {
			console.log(files[ii]._id);
			const oldFile = await Files.findByIdAndDelete(files[ii]._id);
			console.log("delete")
		}
		const oldUser = await User.findByIdAndRemove(userId);
		res.clearCookie('Session');
		res.redirect('/');
		//res.status(200).json({ success: true });
	}
};