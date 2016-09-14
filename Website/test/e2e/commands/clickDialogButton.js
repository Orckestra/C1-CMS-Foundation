var events = require('events');
var util = require('util');

function ClickOnDialogButton() {
  events.EventEmitter.call(this);
}

util.inherits(ClickOnDialogButton, events.EventEmitter);

ClickOnDialogButton.prototype.command = function (button) {
    this.client.api
        .selectFrame('#dialogbuttonstoolbar')
        .waitForElementVisible('clickbutton[label="' + button + '"]', 1000)
        .click('clickbutton[label="'+button+'"]', () => this.emit('complete'))
    return this.client.api;
};

module.exports = ClickOnDialogButton;
