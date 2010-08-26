using System;
using Composite.Core.Logging;


namespace Composite.C1Console.Events
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class FlushEventArgs : EventArgs
    {
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PostFlushEventArgs : EventArgs
    {
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ShutDownEventArgs : EventArgs
    {
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PrepareForShutDownEventArgs : EventArgs
    {
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class GlobalEventSystemFacade
    {
        public delegate void FlushEventDelegate(FlushEventArgs args);
        public delegate void PostFlushEventDelegate(PostFlushEventArgs args);
        public delegate void ShutDownEventDelegate(ShutDownEventArgs args);
        public delegate void PrepareForShutDownEventDelegate(PrepareForShutDownEventArgs args);
      


        private static event FlushEventDelegate _flushEvent;
        private static event PostFlushEventDelegate _postFlushEvent;
        private static event ShutDownEventDelegate _shutDownEvent;
        private static event PrepareForShutDownEventDelegate _prepareForShutDownEvent;


        /// <summary>
        /// Flush code MAY NOT do ANY kind of re-initialization. 
        /// </summary>
        /// <param name="eventDelegate"></param>
        public static void SubscribeToFlushEvent(FlushEventDelegate eventDelegate)
        {
            _flushEvent += eventDelegate;
        }


        public static void SubscribeToPostFlushEvent(PostFlushEventDelegate eventDelegate)
        {
            _postFlushEvent += eventDelegate;
        }


        public static void UnsubscribeFromFlushEvent(FlushEventDelegate eventDelegate)
        {
            _flushEvent -= eventDelegate;
        }        


        public static void FlushTheSystem()
        {
            FlushTheSystem(false);
        }

        internal static void FlushTheSystem(bool waitForHooksInitialization)
        {
            GlobalInitializerFacade.ReinitializeTheSystem(
                delegate()
                {
                    FireFlushEvent();

                	// LoadDynamicTypesInformation();

                    FirePostFlushEvent();
                }, waitForHooksInitialization);
        }


        private static void FireFlushEvent()
        {
            if (_flushEvent != null)
            {
                LoggingService.LogVerbose("RGB(255, 128, 255)GlobalEventSystemFacade", "----------========== Firing Flush Events ==========----------");
                int startTime = Environment.TickCount;

                FlushEventDelegate flushEvent = _flushEvent;

                flushEvent(new FlushEventArgs());

                int endTime = Environment.TickCount;
                LoggingService.LogVerbose("RGB(255, 128, 255)GlobalEventSystemFacade", string.Format("----------========== Done firing Flush Events ({0} ms ) ==========----------", endTime - startTime));
            }
        }

        private static void FirePostFlushEvent()
        {
            if (_postFlushEvent != null)
            {
                LoggingService.LogVerbose("RGB(255, 128, 255)GlobalEventSystemFacade", "----------========== Firing Post Flush Events ==========----------");
                int startTime = Environment.TickCount;

                PostFlushEventDelegate postFlushEvent = _postFlushEvent;

                postFlushEvent(new PostFlushEventArgs());

                int endTime = Environment.TickCount;
                LoggingService.LogVerbose("RGB(255, 128, 255)GlobalEventSystemFacade", string.Format("----------========== Done firing Post Flush Events ({0} ms ) ==========----------", endTime - startTime));
            }
        }


        public static void SubscribeToPrepareForShutDownEvent(PrepareForShutDownEventDelegate eventDelegate)
        {
            _prepareForShutDownEvent += eventDelegate;
        }


        public static void SubscribeToShutDownEvent(ShutDownEventDelegate eventDelegate)
        {
            _shutDownEvent += eventDelegate;
        }

        public static void UnsubscribeFromPrepareForShutDownEvent(PrepareForShutDownEventDelegate eventDelegate)
        {
            _prepareForShutDownEvent -= eventDelegate;
        }

        public static void UnsubscribeFromShutDownEvent(ShutDownEventDelegate eventDelegate)
        {
            _shutDownEvent -= eventDelegate;
        }


        public static void PrepareForShutDown()
        {
            if(_prepareForShutDownEvent != null)
            {
                _prepareForShutDownEvent(new PrepareForShutDownEventArgs());
            }
        }


        public static void ShutDownTheSystem()
        {
            GlobalInitializerFacade.UninitializeTheSystem(FireShutDownEvent);
        }



        private static void FireShutDownEvent()
        {
            if (_shutDownEvent != null)
            {
                LoggingService.LogVerbose("RGB(255, 128, 255)GlobalEventSystemFacade", "----------========== Firing Shut Down Events ==========----------");
                int startTime = Environment.TickCount;

                ShutDownEventDelegate shutDownEvent = _shutDownEvent;

                shutDownEvent(new ShutDownEventArgs());

                int endTime = Environment.TickCount;
                LoggingService.LogVerbose("RGB(255, 128, 255)GlobalEventSystemFacade", string.Format("----------========== Done firing Shut Down Events ({0} ms ) ==========----------", endTime - startTime));
            }
        }

    }
}
