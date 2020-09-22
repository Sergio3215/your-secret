const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
//process.env.mongodb_Uri
mongoose.connect("mongodb+srv://Sergio:Serpiente32_@cluster0.6csdv.gcp.mongodb.net/Test?retryWrites=true&w=majority", {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(db => console.log('db connected'))
	.catch(err => console.log(err))