/* global SystemJS, suiteStack */
import glob from 'glob';
import { Suite } from '@node/mocha';

export function importSuite() {
	return describeDirs()
	.catch(err => {
		console.error(err); // eslint-disable-line no-console
		console.error(err.stack); // eslint-disable-line no-console
		process.exit(1);
	});
}

function forEachPromise(items, iterator) {
	// Iterate through array, chain promises up for each element.
	// Iterator shopuld return a promise if it is async-dependent
	var p = Promise.resolve(null);
	return items.reduce((promise, item) => promise.then(() => iterator(item)), p);
}

const baseDir = './test/unit/suite'; // Can't use SystemJS paths
const jsFileEx = /.js$/;
function describeDirs(testDir) {
	let cwd = baseDir + (testDir ? '/' + testDir : '');
	let dirs = glob.sync('*', { cwd });
	return forEachPromise(dirs, pathName => {
		let fullPathName = (testDir ? testDir + '/' : '') + pathName;
		if (jsFileEx.test(pathName)) {
			// Test file, import where we stand
			return SystemJS.import(baseDir + '/' + fullPathName);
		} else {
			// Directory, describe by name, move in and check contents
			let groupName = pathName[0].toUpperCase() + pathName.slice(1);
			let newSuite = Suite.create(suiteStack[0], groupName);
			newSuite.file = 'global-mocha-context';
			suiteStack.unshift(newSuite);
			return describeDirs(fullPathName)
			.then(() => suiteStack.shift());
		}
	});
}
