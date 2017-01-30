var events = require('events');

function ClickText() {
  events.EventEmitter.call(this);
}

ClickText.prototype.command = function (vlaue) {
	this.client.api.selectFrameWithXpath('//*[normalize-space(text())="'+vlaue+'"]');
    
    this.client.api
        .useXpath()
		.moveToElement('//*[normalize-space(text())="'+vlaue+'"]',null,null)
		.mouseButtonClick('left').useCss()
        
    return this.client.api;
};

module.exports = ClickText;