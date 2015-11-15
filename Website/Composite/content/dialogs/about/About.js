/**
 * @class
 */
var About = new function () {
	
	this._isCredits = false;
	this._y = 0;
	this._i = 1;
	
	/*
	 * Make text selectable!
	 */
	DocumentManager.isDocumentSelectable = true;
	
	/**
	 * @implements {ILoadHandler}
	 */
	this.fireOnLoad = function () {
		
		var div0 = document.getElementById ( "prettyversion" );
		var div1 = document.getElementById ( "version" );
		var idfield = document.getElementById("id");
		var copyright = document.getElementById("copyright");
		
		div0.firstChild.data = div0.firstChild.data.replace ( "${pretty}", Installation.applicationName );
		div1.firstChild.data = div1.firstChild.data.replace ( "${version}", Installation.versionString );
		idfield.value = idfield.value.replace("${id}", Installation.installationID);
		copyright.firstChild.data = copyright.firstChild.data.replace("${year}", new Date().getFullYear());
		
		DOMEvents.addEventListener ( window, DOMEvents.UNLOAD, this );
		DOMEvents.addEventListener ( document, DOMEvents.MOUSEOVER, this );
		DOMEvents.addEventListener ( document, DOMEvents.MOUSEOUT, this );
	}
	
	/**
	 * @param {Event} e
	 */
	this.handleEvent = function ( e ) {
		
		switch ( e.type ) {
			
			case DOMEvents.UNLOAD :
				if ( this._isCredits ) {
					top.clearInterval ( this._interval );
				}
				break;
				
			case DOMEvents.MOUSEOVER : 
				if ( this._isCredits ) {
					var target = DOMEvents.getTarget ( e );
					if ( target.nodeName.toLowerCase () == "a" ) {
						this._i = 0;
					}
				}
				break;
				
			case DOMEvents.MOUSEOUT :
				if ( this._isCredits ) {
					var target = DOMEvents.getTarget ( e );
					if ( target.nodeName.toLowerCase () == "a" ) {
						this._i = 1;
					}
				}
				break;
		}
	}
	
	this.credits = function () {
		
		if ( !this._isSwitching ) {
			
			if ( !this._isCredits ) {
				
				this._isSwitching = true;
				if ( !this._hasCredits ) {
					this._buildCredits ();
					this._hasCredits = true;
				}
				
				this._isCredits = true;
				
				var cover = bindingMap.infocover;
				cover.bindingElement.style.display = "block";
				CoverBinding.fadeIn ( cover );
				
				this._y = 0;
				this._i = 1;
				
				var self = this;
				var button = window.bindingMap.buttonCredits;
				setTimeout ( function () {
					button.setLabel ( "${string:Website.Dialogs.About.LabelBack}" ); 
					button.setImage ( "${icon:back}" );
					setTimeout ( function () {
						document.getElementById ( "info" ).style.display = "none";
						self._interval = top.setInterval ( function () {
							self.tick ();
						}, 25 );
						self._isSwitching = false;
					}, 500 );
				}, 500 );
				
			} else {
				
				this._back ();
			}
		}
	}
	
	this._buildCredits = function () {
		
		var credits = new List ( InstallationService.GetCreditsInfo ( true ));
		var div = document.getElementById ( "names" );
		
		credits.each ( function ( category ) {
			
			var h2 = document.createElement ( "h2" );
			var p = document.createElement ( "p" );
			
			h2.appendChild ( document.createTextNode ( category.Key ));
			
			var names = new List ( category.Value.split ( ";" )); 
			names.each ( function ( name, index ) {
				p.appendChild ( document.createTextNode ( name ));
				p.appendChild ( document.createElement ( "br" ));
			});
		
			div.appendChild ( h2 );
			div.appendChild ( p );
		});
		
	}
	
	this.tick = function () {
		
		try {
		
			var roll = document.getElementById ( "roll" );
			if ( roll != null ) {
				if ( Math.abs ( this._y ) == roll.offsetHeight - ( 70 + 59 )) {
					var self = this;
					setTimeout ( function () {
						self._back ( true );
					}, 500 );
				} else {
					this._y -= this._i;
					roll.style.top = this._y + "px";
				}
			} else {
				top.clearInterval ( this._interval );
			}
		
		} catch ( exception ) {
			top.clearInterval ( this._interval );
		}
	}
	
	this._back = function ( isEnd ) {
		
		top.clearInterval ( this._interval );
		
		if ( this._isCredits ) {
			
			this._isCredits = false;
				
			var roll = document.getElementById ( "roll" );
			var info = document.getElementById ( "info" );
			roll.style.top = 0;
			
			var cover = bindingMap.infocover;
			if ( Binding.exists ( cover )) {
				if ( isEnd ) {
					CoverBinding.fadeOut ( cover );
				} else {
					cover.bindingElement.style.opacity = "0";
				}
			}
		
			info.style.display = "block";
			
			var button = window.bindingMap.buttonCredits;
			if ( Binding.exists ( button )) {
			    button.setLabel( "${string:Website.Dialogs.About.LabelCredits2}" ); 
				button.setImage ( false );
			}
		}
	}
}

WindowManager.fireOnLoad ( About );