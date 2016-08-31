module.exports = {
	url: '',
	elements: [
		{ usernameField: '#id_username' },
		{ usernameInput: '#id_username > box > input' },
		{ passwordField: '#id_password' },
		{ passwordInput: '#id_password > box > input' },
		{ submitButton: '#loginButton' }
	],
	commands: [
		{
			isShown: function () {
				this.waitForElementVisible('@usernameField', 2500);
				return this;
			},
			setUsername: function (username) {
				this
					.clearValue('@usernameInput') // There may be a default value, clear it
					.setValue('@usernameInput', username);
				return this;
			},
			setPassword: function (password) {
				this
					.clearValue('@passwordInput') // There may be a default value, clear it
					.setValue('@passwordInput', password);
				return this;
			},
			fullLogin: function (username, password) {
				return this
					.isShown()
					.setUsername(username || 'admin')
					.setPassword(password || '123456')
					.click('@submitButton')
					.waitForElementNotVisible('@usernameField', 1000);
			}
		}
	]
};
