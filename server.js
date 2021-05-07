// we will handle socket connection here

const io = require('socket.io')(8000);
const cors = require('cors');
const users = {};

io.on('connection', (socket) => {
  socket.on('new-user-joined', (nameOfuser) => {
    console.log('new user joined', nameOfuser);
    users[socket.id] = nameOfuser;
    socket.broadcast.emit('user-joined', nameOfuser);
  });

  socket.on('send', (message) => {
    socket.broadcast.emit('receive', {
      message: message,
      nameOfuser: users[socket.id],
    });
  });
  socket.on('disconnect', (message) => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});
