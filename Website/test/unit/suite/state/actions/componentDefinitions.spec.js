import expect from '../../../helpers/expect';
import * as actions from '../../../../../Composite/console/state/actions/componentDefinitions';

describe('Component definitions', () => {
	it('has action descriptors', () =>
		expect(actions, 'to have property', 'STORE_DEF', 'DEFINITIONS.STORE')
	);

	describe('addDefinition', () => {
		let addDefinition, pageDef;
		beforeEach(() => {
			addDefinition = actions.addDefinition;
			pageDef = {
				name: 'testPage',
				type: 'TestComponent',
				fieldsets: [],
				buttons: []
			};
		});

		it('is an action creator', () =>
			expect(addDefinition, 'to be a function')
			.then(() => {
				let action = addDefinition('page', pageDef);
				return expect(action, 'to be an action of type', actions.STORE_DEF)
				.and('to have property', 'defType', 'page')
				.and('to have property', 'definition', pageDef);
			})
		);
	});
});
