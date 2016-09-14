var events = require('events');

function ClickSave() {
  events.EventEmitter.call(this);
}

ClickSave.prototype.command = function () {
    this.client.api
        .selectFrame('#savebutton');
	this.client.api.expect.element('#savebutton').to.not.have.attribute('isdisabled');
	this.client.api.click('#savebutton > labelbox');
	this.client.api.waitForElementVisible('#savebutton[isdisabled="true"]',20000);
    return this.client.api;
};

module.exports = ClickSave;