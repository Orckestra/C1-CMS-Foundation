var events = require('events');

function SubmitForm() {
  events.EventEmitter.call(this);
}

SubmitForm.prototype.command = function (submitValue) {
	this.client.api.selectFrameWithXpath('//*[local-name()="input"][@value="'+submitValue+'"]');
	this.client.api
        .useXpath()
		.click('//*[local-name()="input"][@value="'+submitValue+'"]')
		
    return this.client.api;
};

module.exports = SubmitForm;