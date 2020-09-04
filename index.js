const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const userRouter = require('./router/userRouter');
const filesRouter = require('./router/files');

//web socket
var server = require('http').Server(app);
var socket = require('./socket');
socket.connect(server)
//cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());


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
app.use(express.static('react_modules'))

/*app.listen(3000,()=>{
    console.log('conected');
})*/

server.listen(3000,()=>{
	console.log('conected with WebSocket')
});
//WebSocket
var messages = [
	{
		author: 'Bot',
		text: 'Bienvenido al chat!'
	}
];

var id = 0;

/*socket.on('connection', function(socket) {
	socket.on('login', user => {
		id++;
		socket.userName = user;
		socket.id = id;

		var msg = {
			author: 'Bot',
			text: socket.userName + ' ha entrado a la sala'
		};
		messages.push(msg);
		socket.sockets.emit('messages', messages);
	});

	socket.on('disconnect', () => {
		var msg = {
			author: 'Bot',
			text: socket.userName + ' ha salido de la sala'
		};
		messages.push(msg);
		socket.sockets.emit('messages', messages);
	});

	socket.emit('messages', messages);

	socket.on('new-message', data => {
		console.log(data);
		messages.push(data);
		socket.sockets.emit('messages', messages);
	});
	var key = false;
	socket.on('posted', data => {
		key = !data;
		socket.sockets.emit('viewPost', key);
	});
	socket.emit('viewPost', key);
});*/