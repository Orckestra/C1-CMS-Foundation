var events = require('events');

function ClickLabel() {
  events.EventEmitter.call(this);
}

ClickLabel.prototype.command = function (label,parentLabel) {
	var selector;
	if(parentLabel===null){
		selector ='//*[@label="'+label+'"]';
	}
	else{
		selector= '//*[@label="'+parentLabel+'"]//*[@label="'+label+'"]'
	}
	this.client.api.selectFrameWithXpath('//*[@label="'+label+'"]');
    
	this.client.api
        .useXpath()
		.moveToElement('//*[@label="'+label+'"]',null,null)
		.mouseButtonClick('left').useCss()
        
    return this.client.api;
};

module.exports = ClickLabel;