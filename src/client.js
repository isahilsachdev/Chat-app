const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const audio = new Audio('ting.mp3');
const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  position == 'left' ? audio.play() : null;
};
const nameOfuser = prompt('hey , whats your name ?');
socket.emit('new-user-joined', nameOfuser);

socket.on('user-joined', (nameOfuser) => {
  append(`${nameOfuser} joined the chat 😁`, 'left');
});

socket.on('receive', (data) => {
  append(`${data.nameOfuser} : ${data.message}`, 'left');
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You : ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
});

socket.on('left', (nameOfuser) => {
  append(`${nameOfuser} left the chat 😒`, 'left');
});
