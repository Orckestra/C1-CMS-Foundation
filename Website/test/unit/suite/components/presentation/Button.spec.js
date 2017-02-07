import expect from 'unittest/helpers/expect.js';
import { getStyles } from 'console/components/presentation/Button.js';

describe('Button', () => {
	describe('getStyles', () => {
		it('gets a style based on an id', () =>
			expect(getStyles, 'when called with', [{ buttonStyle: 'small' }], 'to satisfy', [
				[ '\n\t\tmin-width: 42px;\n\t' ]
			])
		);

		it('gets multiple styles if specified', () =>
			expect(getStyles, 'when called with', [{ buttonStyle: 'small main' }], 'to satisfy', [
				[ '\n\t\tmin-width: 42px;\n\t' ],
				[
					'\n\t\tborder: 1px solid ', '#22B980',
					';\n\t\tbackground-image: linear-gradient(to bottom, ', '#22B980', ' 0%, ', '#1ea371',
					' 100%);\n\t\tcolor: white;\n\t\tpadding-top: 4px;\n\t\tpadding-bottom: 4px;\n\t'
				]
			])
		);
	});
});
