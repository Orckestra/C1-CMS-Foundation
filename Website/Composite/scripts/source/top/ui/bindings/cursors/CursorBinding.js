CursorBinding.prototype = new Binding;
CursorBinding.prototype.constructor = CursorBinding;
CursorBinding.superclass = Binding.prototype;

/**
 * Fade in cursor.
 * @param {CursorBinding} cursor
 */
CursorBinding.fadeIn = function ( cursor ) {
	
	if ( cursor instanceof CursorBinding ) {
		cursor.setOpacity ( 0 );
		cursor.show ();
		new Animation (
			{
				modifier : Client.isExplorer ? 18 : 9,
				onstep : function ( iterator ) {
					cursor.setOpacity ( 
						Math.sin ( iterator * Math.PI / 180 )
					);
				},
				onstop : function () {
					cursor.setOpacity ( 1 );
				}
			}
		).play ();
	}
}

/**
 * Fade out cursor.
 * @param {CursorBinding} cursor
 */
CursorBinding.fadeOut = function ( cursor ) {
	
	if ( cursor instanceof CursorBinding ) {
		new Animation ({
			modifier : Client.isExplorer ? 18 : 9,
			onstep : function ( iterator ) {
				cursor.setOpacity ( 
					Math.cos ( 
						iterator * Math.PI / 180
					)
				);
			},
			onstop : function () {
				cursor.hide ();
			}
		}).play ();
	}
}

/**
 * Move cursor from one point to another whilst fading it out.
 * @param {CursorBinding} cursor
 */
CursorBinding.moveOut = function ( cursor, startpoint, endpoint ) {
	
	if ( cursor instanceof CursorBinding ) {
		
		// compensate for cursor icons visual displacement
		endpoint.x -= 16;
		endpoint.y -= 16;
	
		new Animation ({
			modifier : 3,
			onstep : function ( iterator ) {
				var tal = Math.sin ( iterator * Math.PI / 180 );
				cursor.setPosition ( new Point (
					(( 1 - tal ) * startpoint.x ) + (( 0 + tal ) * endpoint.x ),
					(( 1 - tal ) * startpoint.y ) + (( 0 + tal ) * endpoint.y )
				));
			},
			onstop : function () {
				CursorBinding.fadeOut ( cursor )
			}
		}).play ();
	}
}

/**
 * @class
 */
function CursorBinding () {

	/**
	 * @type {SystemLogger}
	 */
	this.logger = SystemLogger.getLogger ( "CursorBinding" );
	
	/**
	 * @type {LabelBinding}
	 */
	this._labelBinding = null;
	
	/**
	 * @type {number}
	 */
	this._opacity = 1;
	
	/**
	 * @type {boolean}
	 */
	this.isAccepting = true;
	
	/*
	 * @returnable.
	 */
	return this;
}

/**
 * Identifies binding.
 */
CursorBinding.prototype.toString = function () {
	
	return "[CursorBinding]";
}

/**
 * @overloads {Binding#onBindingAttach}
 */
CursorBinding.prototype.onBindingAttach = function () {
	
	CursorBinding.superclass.onBindingAttach.call ( this );
	
	this._labelBinding = this.add (
		LabelBinding.newInstance ( 
			this.bindingDocument 
		)
	);
	
	var image = this.getProperty ( "image" );
	if ( image != null ) {
		this.setImage ( image );
	}
	
	this._stopIndicatorBinding = this.add (
		LabelBinding.newInstance ( 
			this.bindingDocument 
		)
	);
	
	this._stopIndicatorBinding.attachClassName ( "indicator" );
	this._stopIndicatorBinding.setImage ( 
		"${icon:cancel}" 
	);
	
	this.hide ();
	this._stopIndicatorBinding.hide ();
}

/**
 * @param {string} url
 */
CursorBinding.prototype.setImage = function ( url ) {
	
	this._labelBinding.setImage ( url );
}

/**
 * Show acceptance.
 */
CursorBinding.prototype.showAcceptance = function () {
	
	this.isAccepting = true;
	
	if ( Client.isMozilla ) {
		this._stopIndicatorBinding.hide ();
	} else {
		var self = this;
		setTimeout ( function () {
			if ( self.isAccepting ) {
				self._stopIndicatorBinding.hide ();
			}
		}, 0 );
	}
}

/**
 * Hide acceptance.
 */
CursorBinding.prototype.hideAcceptance = function () {

	this.isAccepting = false;
	
	if ( Client.isMozilla ) {
		this._stopIndicatorBinding.show ();
	} else {
		var self = this;
		setTimeout ( function () {
			if ( !self.isAccepting ) {
				self._stopIndicatorBinding.show ();
			}
		}, 0 );
	}
}

/**
 * @overloads {Binding#show}
 */
CursorBinding.prototype.show = function () {

	CursorBinding.superclass.show.call ( this );
	
	/*
	this._stopIndicatorBinding.show ()
	this._isAccepting = false;
	*/
}

/**
 * @param {number} opacity From zero to one!
 */
CursorBinding.prototype.setOpacity = function ( opacity ) {
	
	if ( Client.isMozilla ) {
		this.bindingElement.style.MozOpacity = new String ( opacity );
	} else {
		this.bindingElement.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + new String ( opacity * 100 ) + ")";
	}
	this._opacity = opacity;
}

/**
 * @return {number}
 */
CursorBinding.prototype.getOpacity = function () {
	
	return this._opacity;
}

/**
 * @param {Position} pos
 */
CursorBinding.prototype.setPosition = function ( pos ) {
	
	this.bindingElement.style.left = pos.x + "px";
	this.bindingElement.style.top = pos.y + "px";
}

/**
 * @return {Position}
 */
CursorBinding.prototype.getPosition = function () {
	
	return new Point (
		this.bindingElement.offsetLeft,
		this.bindingElement.offsetTop
	);
}

/**
 * Fade in.
 */
CursorBinding.prototype.fadeIn = function () {
	
	CursorBinding.fadeIn ( this ); 
}

/**
 * Fade out.
 */
CursorBinding.prototype.fadeOut = function () {
	
	CursorBinding.fadeOut ( this ); 
}