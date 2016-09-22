var events = require('events');
var util = require('util');

function ClickOnDialogButton() {
  events.EventEmitter.call(this);
}

util.inherits(ClickOnDialogButton, events.EventEmitter);

ClickOnDialogButton.prototype.command = function (button) {
    this.client.api
        .selectFrame('clickbutton[label="' + button + '"]')
        .waitForElementVisible('clickbutton[label="' + button + '"]', this.api.globals.timeouts.basic)
        .click('clickbutton[label="'+button+'"]', () => this.emit('complete'))
    return this.client.api;
};

module.exports = ClickOnDialogButton;
