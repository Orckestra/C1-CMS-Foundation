import Immutable from 'immutable';

export const name = 'unexpected-immutable';

export function installInto(expect) {
	expect.addType({
		name: 'Immutable',
		identify: function (obj) {
			return obj && Immutable.Iterable.isIterable(obj);
		},
		equal: function (obj1, obj2) {
			return Immutable.is(obj1, obj2);
		},
		inspect: function (obj, depth, output) {
			output.jsKeyword(obj.constructor.name + ' ').appendInspected(obj.toJS());
		},
		diff: function (actual, expected, output, diff) {
			return diff(actual.toJS(), expected.toJS());
		}
	});

	expect.addAssertion('<Immutable> to [exhaustively] satisfy <Immutable>', function (expect, subject, pattern) {
		return expect(subject.toJS(), 'to [exhaustively] satisfy', pattern.toJS());
	});
	expect.addAssertion('<Immutable> to [exhaustively] satisfy <any>', function (expect, subject, pattern) {
		return expect(subject.toJS(), 'to [exhaustively] satisfy', pattern);
	});

	expect.addType({
		name: 'ImmutableKeyed',
		// Object-like
		base: 'Immutable',
		identify: function (obj) {
			return obj && Immutable.Iterable.isKeyed(obj);
		},
		inspect: function (obj, depth, output, inspect) {
			output.jsKeyword(obj.constructor.name + ' ').append(inspect(obj.toObject()));
		}
	});

	expect.addAssertion('<ImmutableKeyed> to have values [exhaustively] satisfying <any>', function (expect, subject, pattern) {
		return expect(subject.toObject(), 'to have values [exhaustively] satisfying', pattern);
	});

	expect.addAssertion('<ImmutableKeyed> to have [own] property <string> <any>', function (expect, subject, name, value) {
		return expect(subject.toObject(), 'to have [own] property', name, value);
	});

	expect.addAssertion('<ImmutableKeyed> [not] to have property <string>', function (expect, subject, name) {
		return expect(subject.toObject(), '[not] to have property', name);
	});

	expect.addType({
		name: 'ImmutableIndexed',
		// Array-like
		base: 'Immutable',
		identify: function (obj) {
			return obj && Immutable.Iterable.isIndexed(obj);
		},
		inspect: function (obj, depth, output, inspect) {
			output.jsKeyword(obj.constructor.name + ' ').append(inspect(obj.toArray()));
		}
	});

	expect.addAssertion('<ImmutableIndexed> to have items [exhaustively] satisfying <any>', function (expect, subject, pattern) {
		return expect(subject.toArray(), 'to have items [exhaustively] satisfying', pattern);
	});
	expect.addAssertion('<ImmutableIndexed> to have items [exhaustively] satisfying <assertion>', function (expect, subject, ...pattern) {
		return expect(subject.toArray(), 'to have items [exhaustively] satisfying', ...pattern);
	});
}

export default {
	name,
	installInto
};
