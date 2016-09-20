var events = require('events');

function ClickText() {
  events.EventEmitter.call(this);
}

ClickText.prototype.command = function (vlaue) {
	this.client.api.selectFrameWithXpath('//*[normalize-space(text())="'+vlaue+'"]');
    
    this.client.api
        .useXpath()
		.click('//*[normalize-space(text())="'+vlaue+'"]').useCss()
        
    return this.client.api;
};

module.exports = ClickText;