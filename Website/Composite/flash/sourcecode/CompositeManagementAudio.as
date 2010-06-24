/**
 * ALL CHANGES SHOULD BE SYNCHRONIZED WITH LOCALSTORE!!!
 */
package
{
	import flash.display.Sprite;
	import flash.external.ExternalInterface;
	import flash.media.Sound;
	import flash.net.URLRequest;
	import flash.events.Event;
	import flash.media.SoundChannel;
	import flash.utils.Timer;
	import flash.events.TimerEvent;
	
	public class CompositeManagementAudio extends Sprite {
		
		private var output:SoundChannel;
		private var diskotek:Object;
		
		/**
		 * Construct.
		 */
		public function CompositeManagementAudio () {
			
			if ( ExternalInterface.available ) {
				try {
					if ( isBrowserReady ()) {
						diskotek = new Object ();
						setupCallBacks ();
					} else {
						waitForBrowser ();
					}
				} catch ( exception : Error ) {
					ExternalInterface.call ( "initializeAudio" );
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
   		
   		private function playSound ( url:String ) : void {
   			
   			var request:URLRequest = new URLRequest ( url );
			var sound:Sound = new Sound ();
			sound.load ( request );
			output = sound.play ();
   		}
		
		/**
   		 * Setup callbacks.
   		 */
   		private function setupCallBacks () : void {
   			
   			ExternalInterface.addCallback ( "isOperational", 
				function () : Boolean {
					return true;
				}
			);
			
			ExternalInterface.addCallback ( "fromURL", 
				function ( url:String ) : void {
					playSound ( url );
				}
			);
			
			ExternalInterface.call ( "initializeAudio" );
   		}
	}
}