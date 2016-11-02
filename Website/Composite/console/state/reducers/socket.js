import { SOCKET_OPEN, SOCKET_CLOSE } from 'console/access/socket.js';

const initialState = false;
export default function socket(state = initialState, action) {
	switch (action.type) {
	case SOCKET_OPEN:
		return true;
	case SOCKET_CLOSE:
		return false;
	default:
		return state;
	}
}
