import requestJSON from 'console/access/requestJSON.js';
import { storeOptions, setOption } from 'console/state/reducers/options.js';
import { refreshLog } from 'console/state/reducers/logs.js';

const logDateURL = '/Composite/api/Logger/GetDates';
const logURL = '/Composite/api/Logger/GetData';
const prefix = 'LOGS.';

const getLogActionType = prefix + 'GET_DATES';
export const GET_LOG_DATES = getLogActionType + '_COMMENCE';
export const GET_LOG_DATES_DONE = getLogActionType + '_DONE';
export const GET_LOG_DATES_FAILED = getLogActionType + '_FAILED';

export const getLogDates = dateSelectorName => (dispatch, getState) => {
	dispatch({ type: GET_LOG_DATES, dateSelectorName });
	return requestJSON(logDateURL)
	.then(dates => {
		let dateOptions = dates.map(dateString => {
			// Date string is in M/D/YYYY format
			let dateParts = dateString.split('/');
			let date = new Date(Date.UTC(
				parseInt(dateParts[2], 10),
				parseInt(dateParts[0], 10) - 1,
				parseInt(dateParts[1], 10)
			));
			return {
				value: date.toISOString(),
				// TODO: Need to extract IANA langtag from user environment
				label: date.toLocaleDateString('en-gb')
			};
		}).sort((a,b) => (a.value > b.value ? -1 : (a.value < b.value ? 1 : 0)));
		dispatch(storeOptions(dateSelectorName, dateOptions));
		if (!getState().getIn(['options', dateSelectorName])) {
			dispatch(setOption(dateSelectorName, dateOptions[0].value));
		}
		dispatch({ type: GET_LOG_DATES_DONE, dateSelectorName });
	})
	.catch(err => {
		dispatch({ type: GET_LOG_DATES_FAILED, dateSelectorName, message: err.message, stack: err.stack });
		console.error(err); // eslint-disable-line no-console
	});
};

function formatDate(date) {
	return (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear();
}

export const GET_LOG = prefix + 'GET';
export const GET_LOG_DONE = GET_LOG + '_DONE';
export const GET_LOG_FAILED = GET_LOG + '_FAILED';
export const getLogPage = (logTabName, day) => (dispatch) => {
	dispatch({ type: GET_LOG, logTabName, day });
	let fromDate = new Date(day);
	let toDate = new Date(day);
	toDate.setDate(fromDate.getDate() + 1);
	return requestJSON(logURL, {
		method: 'POST',
		body: {
			DateFrom: formatDate(fromDate),
			DateTo: formatDate(toDate),
			Severity: 'Verbose',
			Amount: 5000
		}
	})
	.then(logData => {
		dispatch(refreshLog(logTabName, day, logData));
		dispatch({ type: GET_LOG_DONE, logTabName, day });
	})
	.catch(err => {
		dispatch({ type: GET_LOG_FAILED, logTabName, day, message: err.message, stack: err.stack });
		console.error(err); // eslint-disable-line no-console
	});
};
