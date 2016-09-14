var events = require('events');

function ClickText() {
  events.EventEmitter.call(this);
}

ClickText.prototype.command = function (vlaue) {
	this.client.api.selectFrameWithXpath('//*[text()="'+vlaue+'"]');
    
    this.client.api
        .useXpath()
		.click('//*[text()="'+vlaue+'"]').useCss()
        
    return this.client.api;
};

module.exports = ClickText;