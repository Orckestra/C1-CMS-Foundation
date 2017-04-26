var events = require('events');

function LogOut() {
  events.EventEmitter.call(this);
}

LogOut.prototype.command = function (userName) {
	
    this.client.api		
		.clickLabel(userName)
		.clickLabel("Sign out")
		.waitForElementVisible('#id_username', this.client.api.globals.timeouts.basic);
		
	return this.client.api;
};

module.exports = LogOut;
