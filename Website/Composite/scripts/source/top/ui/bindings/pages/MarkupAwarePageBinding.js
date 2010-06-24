MarkupAwarePageBinding.prototype = new PageBinding;
MarkupAwarePageBinding.prototype.constructor = MarkupAwarePageBinding;
MarkupAwarePageBinding.superclass = PageBinding.prototype;

/**
 * @class
 */
function MarkupAwarePageBinding () {
	
	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "MarkupAwarePageBinding" );
	
	/*
	 * @type {boolean}
	 */
	this._isActivated = false;
	
	/*
	 * @type {boolean}
	 */
	this._isWaiting = false;
	
	/*
	 * Returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
MarkupAwarePageBinding.prototype.toString = function () {

	return "[MarkupAwarePageBinding]";
}

/**
 * @overloads {PageBinding#onBeforePageInitialize}
 */
MarkupAwarePageBinding.prototype.onBeforePageInitialize = function () {
	
	MarkupAwarePageBinding.superclass.onBeforePageInitialize.call ( this );
	
	this.subscribe ( BroadcastMessages.XHTML_MARKUP_ON );
	this.subscribe ( BroadcastMessages.XHTML_MARKUP_OFF );
	this.subscribe ( BroadcastMessages.XHTML_MARKUP_ACTIVATE );
	this.subscribe ( BroadcastMessages.XHTML_MARKUP_DEACTIVATE );
}

/**
 * @implements {IBroadcastListener}
 * @overloads {PageBinding#handleBroadcast}
 * @param {string} broadcast
 * @param {object} arg
 */
MarkupAwarePageBinding.prototype.handleBroadcast = function ( broadcast, arg ) {

	MarkupAwarePageBinding.superclass.handleBroadcast.call ( this, broadcast, arg );
	
	var self = this;
	
	switch ( broadcast ) {
		case BroadcastMessages.XHTML_MARKUP_ON :
			this._activate ( true );
			if ( arg != null ) {
				this._handleMarkup ( arg );
			}
			break;
		case BroadcastMessages.XHTML_MARKUP_OFF :
			this._activate ( false );
			break;
		case BroadcastMessages.XHTML_MARKUP_ACTIVATE :
			this._isWaiting = true;
			this._activate ( true );
			setTimeout ( function () {
				self._isWaiting = false;
			}, 20 );
			break;
		case BroadcastMessages.XHTML_MARKUP_DEACTIVATE :
			setTimeout ( function () {
				if ( !self._isActivated ) {
					self._activate ( false );
				}
			}, 0 );
			break;
	}
}

/**
 * Mark panel activated.
 * @overloads {PageBinding#onActivate}
 */
MarkupAwarePageBinding.prototype.onActivate = function () {
	
	MarkupAwarePageBinding.superclass.onActivate.call ( this );
	
	this._activate ( true );
	this._isActivated = true;
}

/**
 * Unmark panel activated.
 * @overloads {PageBinding#onDeactivate}
 */
MarkupAwarePageBinding.prototype.onDeactivate = function () {
	
	MarkupAwarePageBinding.superclass.onDeactivate.call ( this );
	
	this._isActivated = false;
	var self = this;
	setTimeout ( function () {
		if ( !self._isWaiting ) {
			self._activate ( false );
		}
	}, 0 );
}

/**
 * Handle markup. Subclass should define this.
 * @param {string} markup
 */
MarkupAwarePageBinding.prototype._handleMarkup = function ( markup ) {}

/**
 * Activate and deactivate whenever markup is available. Subclass should define this.
 * @param {boolean} isActivate
 */
MarkupAwarePageBinding.prototype._activate = function ( isActivate ) {}