// Establish socket connection
const socketUrl = new URL('/Composite/api/Logger/WebSocket', location);
if (socketUrl.protocol === 'https:') {
	socketUrl.protocol = 'wss:';
} else if (socketUrl.protocol === 'http:') {
	socketUrl.protocol = 'ws:';
} else {
	throw new Error('Location protocol not HTTP(S), what is going on?');
}
const socket = new WebSocket(socketUrl.href);

socket.sendJSON = function (obj) {
	socket.send(JSON.stringify(obj));
};

const prefix = 'SOCKET.';
export const SOCKET_OPEN = prefix + 'OPEN';
export const SOCKET_CLOSE = prefix + 'CLOSE';
export const SOCKET_ERROR = prefix + 'FAIL';
export function socketError(err) {
	return {
		type: SOCKET_ERROR,
		message: err.message,
		stack: err.stack
	};
}

// Add error handling, retry handling, etc.
socket.subscribe = store => {
	// First verify that socket is live
	if (socket.readyState === WebSocket.CONNECTING) {
		socket.addEventListener('open', () => {
			store.dispatch({ type: SOCKET_OPEN });
		});
	} else if (socket.readyState === WebSocket.OPEN) {
		store.dispatch({ type: SOCKET_OPEN });
	} else {
		// This is a problem.
		store.dispatch({
			type: SOCKET_ERROR,
			message: 'Socket dead on arrival'
		});
		return; // Should really try to reestablish socket.
	}
	socket.addEventListener('error', err => store.dispatch(socketError(err)));
	socket.addEventListener('close', event => store.dispatch({ type: SOCKET_CLOSE, code: event.code, message: event.reason }));
};

export default socket;
