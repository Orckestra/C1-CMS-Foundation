var events = require('events');

function ClickDataBySibiling() {
  events.EventEmitter.call(this);
}

ClickDataBySibiling.prototype.command = function (vlaue) {
	this.client.api.selectFrameWithXpath('//*[local-name()="fielddesc"][normalize-space(text())="'+vlaue+'"]');
    
    this.client.api
        .useXpath()
		.click('//*[local-name()="fielddesc"][normalize-space(text())="'+vlaue+'"]/..//*[local-name()="fielddata"]').useCss()
        
    return this.client.api;
};

module.exports = ClickDataBySibiling;