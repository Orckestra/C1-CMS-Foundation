import requestJSON from 'console/access/requestJSON.js';
import { storeOptions } from 'console/state/reducers/options.js';

const logDateURL = '/Composite/api/Logger/GetDates';

export const getLogDates = dateSelectorName => {
	return dispatch =>
		requestJSON(logDateURL)
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
					label: date.toLocaleDateString('en-gb') // Need to extract IANA langtag from user environment
				};
			}).sort((a,b) => (a.value > b.value ? -1 : (a.value < b.value ? 1 : 0)));
			dispatch(storeOptions(dateSelectorName, dateOptions));
		});
};
