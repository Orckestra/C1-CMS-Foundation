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
				this.waitForElementVisible('@usernameField', this.api.globals.timeouts.basic);
				return this;
			},
			setUsername: function (username) {
				this
					.clearValue('@usernameInput') // There may be a default value, clear it
					.click('@usernameInput')
					.setValue('@usernameInput', username)
					.assert.value('@usernameInput',username);
				return this;
			},
			setPassword: function (password) {
				this
					.clearValue('@passwordInput') // There may be a default value, clear it
					.click('@passwordInput')
					.setValue('@passwordInput', password)
					.assert.value('@passwordInput', password);
				return this;
			},
			fullLogin: function (username, password) {
				return this
					.isShown()
					.setUsername(username || 'admin')
					.setPassword(password || '123456')
					.click('@submitButton')
					.waitForElementNotVisible('@usernameField', this.api.globals.timeouts.basic);
			}
		}
	]
};
