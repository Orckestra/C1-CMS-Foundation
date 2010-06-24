/**
 * This fellow should exceed the most popular 
 * CSS transitions time used around stylesheets. 
 * In fact it has nothing to do with stuff below.
 * @type {int}
 */
Animation.DEFAULT_TIME = parseInt ( 250 );

/**
 * Presents a simple animation interface. When instantiated, user can modify properties interval, 
 * iterator, modifier and endcount to control the animation. User should alsoe override methods 
 * onstart, onstep and onstop before calling the <code>play</code> method. In the example below, 
 * we define animation properties in an optional constructor object. Note that only 
 * some properties are explicitely defined while others are left to default values.
 * <pre>
 *     var animation = new Animation ({
 *         modifier : 5,
 *         onstart : function () {
 *             foo.x = 0;
 *         },
 *         onstep : function ( i ) {
 *             foo.x += 10;
 *         }
 *     }).play ();
 * </pre>
 *
 * @param @optional {object} initializer Quickly configures animation properties.
 * @constructor
 */
function Animation ( initializer ) {

	/** 
	 * uniquely identify this animation. 
	 * @ignore
	 */
	this.id = KeyMaster.getUniqueKey ();
	
	/** 
	 * Iteration interval in milliseconds 
	 * @type {int} 
	 */
	this.interval = 25;
	
	/** 
	 * Iterator starting value 
	 * @type {number} 
	 */
	this.iterator =  0;
	
	/** 
	 * Iterator increment value
	 * @type {number} 
	 */
	this.modifier =  1;
	
	/** 
	 * Iterator end value (animation will stop here) 
	 * @type {number}
	 */
	this.endcount = 90;
	
	// if an animation initializer was specified,
	// apply initializer properties.
	for ( var property in initializer ) {
		this [ property ] = initializer [ property ];
	}
}

/**
 * Starts the animation.
 */
Animation.prototype.play = function () {

	// start playing
	if ( !this.isPlaying ) {
		var self = this;
		this._nextframe = function () {
			window [ this.id ] = setTimeout ( 
				function () {
					self.play ();
				}
			, this.interval );
		}
		this.onstart ( this.iterator );
		this._nextframe ();
		this.isPlaying = true;
	}
	
	// stop playing
	else if ( this.modifier > 0 ? this.iterator >= this.endcount : this.iterator <= this.endcount ) {
		this.stop ();
	}
	
	// play it again
	else {
		var it1 = this.iterator;
		var it2 = this.onstep ( this.iterator );
		if ( it2 && it2 != it1 ) {
			this.iterator = it2;
		} else {
			this.iterator += this.modifier;
		}
		this._nextframe ();
	}
}

/**
 * Stops the animation (not to be confused with "onstop").
 * TODO: perhaps we should clear the timeout around here?
 */
Animation.prototype.stop = function () {
	
	this.onstop ( this.iterator );
	this.isPlaying = false;
}

/**
 * (User should overwrite this method) Action to take when starting animation.
 * @param {number} iterator
 * @return {number} nextIterator
 */
Animation.prototype.onstart = function ( iterator ) {};

/**
 * (User should overwrite this method) Action to take on each animation sequence. 
 * The iterator value is provided as method argument. Optionally, user can overwrite 
 * the animation iterator by making these methods return a number; if a return value 
 * is specified, this value will be used as argument for next iteration.
 * @param {number} iterator
 * @return {number} nextIterator
 */
Animation.prototype.onstep = function ( iterator ) {};

/** 
 * (User should overwrite this method) Action to take when stopping animation
 * @param {number} iterator
 * @return {number} nextIterator
 */
Animation.prototype.onstop = function ( iterator ) {};