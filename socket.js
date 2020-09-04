const socketIO = require('socket.io');
//const socketIO = require('constants');
const socket = {};
function connect(server){
    socket.io = socketIO(server);
}
module.exports={
    connect,
    socket,
}