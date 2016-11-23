import expect from 'unittest/helpers/expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { CLP as ConnectLogPanel } from 'console/components/container/ConnectLogPanel.js';
import LogPanel from 'console/components/presentation/LogPanel.js';
import Immutable from 'immutable';

describe('ConnectLogPanel', () => {
	let renderer, state, store;
	beforeEach(() => {
		renderer = TestUtils.createRenderer();
		state = Immutable.fromJS({
			layout: {
				currentPerspective: 'system',
				perspectives: {
					system: {
						currentPage: 'test1',
						pages: {
							test1: {
								currentTab: 'tab1',
								tabs: {
									tab1: {}
								}
							},
							test2: {}
						}
					}
				}
			},
			pageDefs: {
				test1: {
					name: 'test1',
					tabs: ['tab1']
				}
			},
			tabDefs: {
				tab1: {
					name: 'tab1',
					type: 'testtab',
					logLevels: 'logLevel',
					logPageName: 'page',
					placeholder: 'Empty'
				}
			},
			itemDefs: {
				logLevel: {
					default: ['Information', 'Error']
				},
				page: {
					default: 'page'
				}
			},
			logs: {
				tab1: {
					page: [
						{
							timestamp: '2016-10-07 12:53:32.50',
							message: 'Message1',
							title: 'Title1',
							severity: 'Information'
						},
						{
							timestamp: '2016-10-07 15:17:38.18',
							message: 'Message2',
							title: 'Title1',
							severity: 'Verbose'
						},{
							timestamp: '2016-10-07 12:52:06.49',
							message: 'Message3',
							title: 'Title2',
							severity: 'Verbose'
						},
						{
							timestamp: '2016-10-07 15:17:38.07',
							message: 'Message4',
							title: 'Title3',
							severity: 'Error'
						}
					]
				}
			},
			options: {
				values: {
					'foo': ['not used']
				}
			}
		});
		store = {
			stateObj: state,
			subscribe: sinon.spy().named('subscribe'),
			dispatch: sinon.spy().named('dispatch'),
			getState: sinon.spy(() => store.stateObj).named('getState')
		};
	});

	it('passes data to presentation component', () => {
		renderer.render(<ConnectLogPanel containerHeight={1000} containerWidth={1500} store={store}/>);
		return expect(renderer, 'to have rendered', <LogPanel
		containerHeight={1000} containerWidth={1500}
			placeholder={expect.it('to be a function')}
			logPage={[
				{ message: 'Message4' },
				{ message: 'Message1' }
			]}
		/>);
	});

	it('reacts to changing log levels', () => {
		store.stateObj = state.setIn(['options', 'values', 'logLevel'], Immutable.List(['Verbose']));
		renderer.render(<ConnectLogPanel containerHeight={1000} containerWidth={1500} store={store}/>);
		return expect(renderer, 'to have rendered', <LogPanel
			containerHeight={1000} containerWidth={1500}
			placeholder={expect.it('to be a function')}
			logPage={[
				{ message: 'Message2' },
				{ message: 'Message3' }
			]}
		/>);
	});
});
