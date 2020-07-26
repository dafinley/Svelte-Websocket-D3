import { writable } from 'svelte/store';

const messageStore = writable('');

let socket = new WebSocket('wss://chat.starlineventures.com/subscribe');
const listen = () => { 
  // Connection opened
  socket.addEventListener('open', function (event) {
    console.log("It's open");
  });
}

const message = () => {
  // Listen for messages
  socket.addEventListener('message', function (event) {
    messageStore.set(event.data);
  });
}


const closed = () => {
  socket.addEventListener('close', function (event) {
    console.log("It's closed");
    socket = new WebSocket('wss://chat.starlineventures.com/subscribe');
    setupWebSocketListeners();
  });
}

const error = () => {
  socket.addEventListener('error', function (event) {
    console.log("Socket error");
    socket = new WebSocket('wss://chat.starlineventures.com/subscribe');
    setupWebSocketListeners();
  });
}

const setupWebSocketListeners = () => {
  listen();
  message();
  closed();
  error();
}


setupWebSocketListeners();


const sendMessage = (message) => {
	if (socket.readyState <= 1) {
		socket.send(message);
	}
}


export default {
	subscribe: messageStore.subscribe,
	sendMessage
}

