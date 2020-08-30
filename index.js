const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const userRouter = require('./router/userRouter');
const filesRouter = require('./router/files');

//middlewar multer
const storage = multer.diskStorage({
	destination: path.join(__dirname,'/public/upload'),
	filename: (req,file,cb)=>{
		cb(null, new Date().getTime()+path.extname(file.originalname))
	}
});
app.use(multer({storage}).single('file'))

//Rest API
app.use(bodyParser.json());

app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

//Ruters
app.use('/users', userRouter);
app.use('/files', filesRouter);

//enviroment and database
require('dotenv').config();
require('./database');

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});
app.get('/logout', (req, res) => {
	res.clearCookie('Session');
	res.redirect('/');
});

app.use(express.static('public'))

app.listen(3000,()=>{
    console.log('conected');
})