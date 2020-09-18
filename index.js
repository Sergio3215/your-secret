const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const userRouter = require('./router/userRouter');
const filesRouter = require('./router/files');
const profileRouter = require('./router/profile');

//web socket
var server = require('http').Server(app);
var socket = require('./socket');
socket.connect(server)
//cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());


//middlewar multer
const storage = multer.diskStorage({
	destination: path.join(__dirname, '/public/upload'),
	filename: (req, file, cb) => {
		cb(null, new Date().getTime() + path.extname(file.originalname))
	}
});
app.use(multer({ storage }).single('file'))

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
app.use('/profiles', profileRouter);

//enviroment and database
require('dotenv').config();
require('./database');

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.get('/profile/:name', async (req, res) => {
	const User = require('./model/userModel');
	const { user } = req.params.name;
	let userName = await User.find(user);

	var key = false;
	for (var kk = 0; kk < userName.length; kk++) {
		if (userName[kk].user === req.params.name) {
			key = true;
		}
	}

	if (key) {
		//res.send(req.params.name);
		res.sendFile(__dirname + "/public/profile/index.html");
	}
	else {
		res.send("Error! No se ha encontrado el usuario");
	}
});

app.get('/config', (req, res) => {
	res.sendFile(__dirname + "/public/configuration/index.html");
});

app.get('/logout', (req, res) => {
	res.clearCookie('Session');
	res.redirect('/');
});

app.use(express.static('public'))
app.use(express.static('public/profile'))
app.use(express.static('public/configuration'))
app.use(express.static('react_modules'));

//Error Custom
app.use((req, res)=>{
	res.status(404).send('The page don\'t exist')
})

server.listen(3000, () => {
	console.log('conected with WebSocket')
});

//WebSocket
/*var messages = [
	{
		author: 'Bot',
		text: 'Bienvenido al chat!'
	}
];

var id = 0;

socket.on('connection', function(socket) {
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