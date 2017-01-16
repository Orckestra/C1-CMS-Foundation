// Mock out WampClient
System.set(
	System.normalizeSync('console/access/wampClient.js'),
	System.newModule({
		default: {
			mockery: () => Promise.resolve(),
			setMock: function (mock) {
				this.mockery = mock;
			},
			call: function (...args) {
				return this.mockery(...args);
			},
			subscribe: function (...args) {
				return this.mockery(...args);
			},
			reset: function () {
				this.mockery = () => Promise.resolve();
			}
		}
	})
);
