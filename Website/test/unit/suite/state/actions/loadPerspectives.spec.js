import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import { STORE_DEF } from 'console/state/reducers/definitions.js';
import * as actions from 'console/state/actions/loadPerspectives.js';
import WAMPClient from 'console/access/wampClient.js';


describe('loadPerspectives', () => {
	it('has action descriptors', () =>
		expect(actions, 'to have property', 'LOAD_PERSPECTIVES')
		.and('to have property', 'LOAD_PERSPECTIVES_DONE')
		.and('to have property', 'LOAD_PERSPECTIVES_FAILED')
	);

	describe('loadPerspectives', () => {
		let dispatch, wampCall, loadPerspectives;
		beforeEach(() => {
			loadPerspectives = actions.loadPerspectives;
			dispatch = sinon.spy(x => {
				if (typeof x === 'function') {
					return x(dispatch);
				}
			}).named('dispatch');
			let perspectives = [
				{
					name: 'content',
					icon: 'perspective-content',
					label: 'Content',
					rootPage: 'content-explorer'
				},
				{
					name: 'media',
					icon: 'perspective-media',
					label: 'Media',
					rootPage: 'media-explorer'
				}
			];
			wampCall = sinon.stub().named('wampCall').returns(Promise.reject('Wrong parameters'));
			wampCall.withArgs('mock.struct.perspectives').returns(Promise.resolve(perspectives));
			WAMPClient.setMock(wampCall);
		});

		afterEach(() => {
			WAMPClient.reset();
		});

		it('creates a thunk that loads definitions and dispatches actions', () => {
			return expect(() => expect(loadPerspectives, 'when called')
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'not to error')
			.then(() => Promise.all([
				// expect(wampCall, 'was called once'),
				expect(dispatch, 'to have calls satisfying', [
					{ args: [{ type: actions.LOAD_PERSPECTIVES }] },
					{ args: [{ type: STORE_DEF, defType: 'perspective', definition: {
						name: 'content',
						icon: 'perspective-content',
						label: 'Content',
						rootPage: 'content-explorer'
					}}]},
					{ args: [{ type: STORE_DEF, defType: 'perspective', definition: {
						name: 'media',
						icon: 'perspective-media',
						label: 'Media',
						rootPage: 'media-explorer'
					}}]},
					{ args: [{ type: actions.LOAD_PERSPECTIVES_DONE }] }
				])
			]));
		});

		it('sends word of unhandled errors', () => {
			wampCall.withArgs('mock.struct.perspectives').returns(Promise.reject(new Error('test error')));
			return expect(() => expect(loadPerspectives, 'when called')
			.then(thunk =>
				expect(thunk, 'to be a function')
				.and('when called with', [dispatch])
			),
			'not to error')
			.then(() =>
				expect([dispatch], 'to have calls satisfying', [
					{ spy: dispatch, args: [{ type: actions.LOAD_PERSPECTIVES }] },
					{ spy: dispatch, args: [{ type: actions.LOAD_PERSPECTIVES_FAILED, message: 'test error' }] }
				])
			);
		});
	});
});
