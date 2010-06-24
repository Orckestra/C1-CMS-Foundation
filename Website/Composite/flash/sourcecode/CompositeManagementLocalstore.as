package {
	
	import flash.display.Sprite;
	import flash.display.DisplayObject;
	import flash.net.SharedObject;
	import flash.external.ExternalInterface;
	import flash.utils.Timer;
	import flash.events.TimerEvent;

	public class CompositeManagementLocalstore extends Sprite {
		
		private var so:SharedObject = null;
		
		public function CompositeManagementLocalstore () {
			
			if ( ExternalInterface.available ) {
				try {
					var clientstring:String = ExternalInterface.call ( "getClientString" );
					var objectstring:String = "CompositeManagementLocalStore" + clientstring 
					so = SharedObject.getLocal ( objectstring );
					if ( isBrowserReady ()) {
						setupCallBacks ();
					} else {
						waitForBrowser ();
					}
				} catch ( exception : Error ) {
					ExternalInterface.call ( "initializeLocalStore" );
				}	
			}
		}
		
		/**
		 * Wait for browser to initialize Flash handling properly.
		 */
		private function waitForBrowser () : void {
			
			var timer:Timer = new Timer ( 25 );
			timer.addEventListener ( TimerEvent.TIMER, 
				function ( event:TimerEvent ):void {
		    		if ( isBrowserReady()) {
		        		Timer(event.target).stop();
		       			setupCallBacks ();
					}
				} 
			);
        	timer.start();
		}
		
		/**
		 * Returns true when browser is 
		 * initialized for Flash handling.
		 */
		private function isBrowserReady():Boolean {

   			return ExternalInterface.call ( "isReady" );
   		}
   		
   		/**
   		 * Setup callbacks.
   		 */
   		private function setupCallBacks () : void {
   			
			ExternalInterface.addCallback ( "setProperty", 
				function ( name:String , value:Object ) : void {
					so.data [ name ] = value;
				}
			);
			ExternalInterface.addCallback ( "getProperty", 
				function ( name:String ) : Object {
					return so.data [ name ];
				}
			);
			ExternalInterface.addCallback ( "deleteProperty", 
				function ( name:String ) : void {
					delete so.data [ name ];
				}
			);
			ExternalInterface.addCallback ( "deleteAll", 
				function () : void {
					for ( var name : String in so.data ) {
						delete so.data [ name ];
					}
				}
			);
			ExternalInterface.addCallback ( "isOperational", 
				function () : Boolean {
					return true;
				}
			);
			ExternalInterface.addCallback ( "flush", 
				function () : String {
					return so.flush();
				}
			);
			ExternalInterface.addCallback ( "clear", 
				function () : void {
					/*
					 * About using the clear method:
					 * http://groups.google.dk/group/macromedia.flash.actionscript/browse_thread/thread/50e4a3770cc129a0/d519d5c020e3df57?lnk=st&q=sharedobject+clear+work&rnum=2&hl=da#d519d5c020e3df57 
					 */
					for ( var name:String in so.data ) {
						delete so.data [ name ];
					}
					so.clear();
				}
			);
			ExternalInterface.call ( "initializeLocalStore" );
   		}
	}
}