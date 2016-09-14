var util = require('util');
var events = require('events');

function ReplaceTextCodeMirror() {
  events.EventEmitter.call(this);
}

ReplaceTextCodeMirror.prototype.command = function (oldVlaue,newValue) {
	this.client.api.selectFrameWithXpath('//*[@id="textarea"]');
	
	this.client.api.click('#textarea')
	this.client.api.execute(function(oldVlaue,newValue) {
		
		var editor = document.getElementsByClassName('CodeMirror')[0].CodeMirror;
		var text = editor.getValue();
		editor.setValue(text.replace(oldVlaue,newValue));
		
	}, [oldVlaue,newValue]);
	return this.client.api;
    
};

module.exports = ReplaceTextCodeMirror;