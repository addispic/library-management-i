import {io} from 'socket.io-client'
// base uri
export const BASE_URI = "http://localhost:5000";

// socket
export const SOCKET = io("ws://localhost:5000")
