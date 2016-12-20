import expect from 'unittest/helpers/expect.js';
import { objectToMarkupString } from 'console/access/postFrame.js';

describe('objectToMarkupString', () => {
	it('transforms an object into a string of nested markup', () => {
		let obj = {
			child1: {},
			child2: {
				grandchild: {}
			}
		};
		return expect(objectToMarkupString(obj, 'obj'), 'to equal', '<obj>\n  <child1/>\n  <child2>\n    <grandchild/>\n  </child2>\n</obj>\n');
	});

	it('handles @-prefixed members as attributes', () => {
		let obj = {
			'@attrib1': 'foo',
			'@attrib2': 'bar',
			child: {
				'@attrib3': 'feep'
			}
		};
		return expect(objectToMarkupString(obj, 'obj'), 'to equal', '<obj attrib1="foo" attrib2="bar">\n  <child attrib3="feep"/>\n</obj>\n');
	});
});
