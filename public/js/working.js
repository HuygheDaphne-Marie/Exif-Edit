const socket = io();
const $message = document.querySelector('#message');
const $spinner = document.querySelector('#spin');

socket.on('new text', (msg) => {
  console.log('got a message')
  $message.innerHTML = msg.text;
  $spinner.classList.remove('spinner');
})