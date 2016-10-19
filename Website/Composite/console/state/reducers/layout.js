import Immutable from 'immutable';

const prefix = 'LAYOUT.';

export const RESIZE_WINDOW = prefix + 'RESIZE';
export function resizeWindow(width, height) {
	return { type: RESIZE_WINDOW, height, width };
}

const initialState = Immutable.Map({
	window: Immutable.Map({ width: 0, height: 0 })
});

export default function logs(state = initialState, action) {
	switch (action.type) {
	case RESIZE_WINDOW:
		return state.set('window', Immutable.Map({ height: action.height, width: action.width }));
	default:
		return state;
	}
}
