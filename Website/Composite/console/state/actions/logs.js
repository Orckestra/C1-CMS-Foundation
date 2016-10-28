import requestJSON from 'console/access/requestJSON.js';
import { storeOptions } from 'console/state/reducers/options.js';

const logDateURL = '/Composite/api/Logger/GetDates';

export const getLogDates = dateSelectorName => {
	return dispatch =>
		// Fetch log date end point
		requestJSON(logDateURL)
		.then(dates => {
			// Map results to Date.toLocaleDateStrings
			let dateOptions = dates.map(dateString => {
				let dateParts = dateString.split('/');
				let localizedDate = new Date(
					parseInt(dateParts[2], 10),
					parseInt(dateParts[0], 10) - 1,
					parseInt(dateParts[1], 10)
				);
				return {
					value: dateString,
					label: localizedDate.toLocaleDateString('en-gb') // Need to extract IANA langtag from user environment
				};
			});
			// Store as options for date selector on log page
			dispatch(storeOptions(dateSelectorName, dateOptions));
		});
};
