import io from 'socket.io-client';
import { dispatchEvent } from "./helpers";

const socket = io("http://127.0.0.1:5000", {
  path: "/ws"
});


socket.on('connect', () => {
  console.error(`[on connect] socket connect status: ${socket.connected}`);
});

socket.on('disconnect', () => {
  console.error(`[on disconnect] socket connect status: ${socket.connected}`);
});


socket.on('cmd_test', (message) => {
  console.log(`received test command from server w/ payload: ${JSON.stringify(message)}`);
});


socket.on('cmd_switch', (message) => {
  console.log("received switch page command from server");
  window.location.href = message.data;
});


export default socket;
