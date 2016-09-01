import requestJSON from 'console/access/requestJSON.js';

const prefix = 'SERVER_ACTION.';

export const FIRE_ACTION = prefix + 'FIRE';
export const FIRE_ACTION_DONE = prefix + 'DONE';
export const FIRE_ACTION_FAILED = prefix + 'FAILED';

export function fireAction(actionId, pageName, values) {
	return dispatch => {
		dispatch({ type: FIRE_ACTION, actionId, pageName });
		return requestJSON('/SomeURL', {
			method: 'POST',
			body: { actionId, pageName, valueData: values }
		})
		.then(() => {
			dispatch({ type: FIRE_ACTION_DONE, actionId, pageName });
		})
		.catch(err => {
			dispatch({ type: FIRE_ACTION_FAILED, actionId, pageName, error: err });
		});
	};
}
