const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.connect(process.env.mongodb_Uri, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(db => console.log('db connected'))
	.catch(err => console.log(err))