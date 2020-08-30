const User = require('../model/userModel');

module.exports = {
	login: async (req, res, next) => {
		try {

			if (req.query.user !== undefined) {
				req.query.user = req.query.user.toLowerCase()
			}

			const { user, password } = req.query;

			if (user !== undefined
				&& password !== undefined) {
				const users = await User.find({ user, password });
				//console.log(user);
				//console.log(password);
				if (users[0].user === user
					&& users[0].password === password) {
					//res.status(200).json(users);
					res.cookie("Session", users[0].id)
				}
				res.status(200).json(users);
			}
			else {
				res.redirect('/')
			}
		}
		catch (e) {
			console.log(e)
		}
	},
	newUser: async (req, res, next) => {
		try {

			if (req.body.user !== undefined) {
				req.body.user = req.body.user.toLowerCase()
			}

			const { user, password, name, email } = req.body;
			console.log(user);
			var date = new Date();
			const emails = await User.find({ email });
			const users = await User.find({ user });
			let newusers = {};
			if (emails.length == 0 && users.length == 0) {
				const newUser = await new User({ user, password, name, email });
				//console.log(newUser)
				newusers = await newUser.save();
			}
			else {
				newusers = {};
			}
			res.status(200).json(newusers);
		}
		catch (e) {
			console.log(e)
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
		const oldUser = await User.findByIdAndUpdate(userId, newUser)
		res.status(200).json({ success: true });
	},
	updateUser: async (req, res, next) => {
		const { userId } = req.params;
		const newUser = req.body;
		const oldUser = await User.findByIdAndUpdate(userId, newUser)
		res.status(200).json({ success: true });
	},
	deleteUser: async (req, res, next) => {
		const { userId } = req.params;
		const oldUser = await User.findByIdAndRemove(userId)
		res.status(200).json({ success: true });
	}
};