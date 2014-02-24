using System;
using Composite.Core;


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
        private static readonly string LogTitle = "RGB(255, 128, 255)GlobalEventSystemFacade";

        /// <exclude />
        public delegate void FlushEventDelegate(FlushEventArgs args);

        /// <exclude />
        public delegate void PostFlushEventDelegate(PostFlushEventArgs args);

        /// <exclude />
        public delegate void ShutDownEventDelegate(ShutDownEventArgs args);

        /// <exclude />
        public delegate void PrepareForShutDownEventDelegate(PrepareForShutDownEventArgs args);

        /// <exclude />
        public delegate void DesignChangeEventDelegate();

        private static event FlushEventDelegate _flushEvent;
        private static event PostFlushEventDelegate _postFlushEvent;
        private static event ShutDownEventDelegate _shutDownEvent;
        private static event PrepareForShutDownEventDelegate _prepareForShutDownEvent;


        /// <summary>
        /// Occurs when elements related to frontend appearance have changed. F.e. css styling changed, or function's rendering changed.
        /// </summary>
        public static event DesignChangeEventDelegate OnDesignChange;


        /// <summary>
        /// Flush code MAY NOT do ANY kind of re-initialization. 
        /// </summary>
        /// <param name="eventDelegate"></param>
        public static void SubscribeToFlushEvent(FlushEventDelegate eventDelegate)
        {
            _flushEvent += eventDelegate;
        }


        /// <exclude />
        public static void SubscribeToPostFlushEvent(PostFlushEventDelegate eventDelegate)
        {
            _postFlushEvent += eventDelegate;
        }


        /// <exclude />
        public static void UnsubscribeFromFlushEvent(FlushEventDelegate eventDelegate)
        {
            _flushEvent -= eventDelegate;
        }


        /// <exclude />
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
                Log.LogVerbose(LogTitle, "----------========== Firing Flush Events ==========----------");
                int startTime = Environment.TickCount;

                FlushEventDelegate flushEvent = _flushEvent;

                flushEvent(new FlushEventArgs());

                int endTime = Environment.TickCount;
                Log.LogVerbose(LogTitle, string.Format("----------========== Done firing Flush Events ({0} ms ) ==========----------", endTime - startTime));
            }
        }


        private static void FirePostFlushEvent()
        {
            if (_postFlushEvent != null)
            {
                Log.LogVerbose(LogTitle, "----------========== Firing Post Flush Events ==========----------");
                int startTime = Environment.TickCount;

                PostFlushEventDelegate postFlushEvent = _postFlushEvent;

                postFlushEvent(new PostFlushEventArgs());

                int endTime = Environment.TickCount;
                Log.LogVerbose(LogTitle, string.Format("----------========== Done firing Post Flush Events ({0} ms ) ==========----------", endTime - startTime));
            }
        }


        /// <exclude />
        public static void SubscribeToPrepareForShutDownEvent(PrepareForShutDownEventDelegate eventDelegate)
        {
            _prepareForShutDownEvent += eventDelegate;
        }


        /// <exclude />
        public static void SubscribeToShutDownEvent(ShutDownEventDelegate eventDelegate)
        {
            _shutDownEvent += eventDelegate;
        }


        /// <exclude />
        public static void UnsubscribeFromPrepareForShutDownEvent(PrepareForShutDownEventDelegate eventDelegate)
        {
            _prepareForShutDownEvent -= eventDelegate;
        }


        /// <exclude />
        public static void UnsubscribeFromShutDownEvent(ShutDownEventDelegate eventDelegate)
        {
            _shutDownEvent -= eventDelegate;
        }


        /// <exclude />
        public static void PrepareForShutDown()
        {
            if(_prepareForShutDownEvent != null)
            {
                _prepareForShutDownEvent(new PrepareForShutDownEventArgs());
            }
        }


        /// <exclude />
        public static void ShutDownTheSystem()
        {
            GlobalInitializerFacade.UninitializeTheSystem(FireShutDownEvent);
        }



        private static void FireShutDownEvent()
        {
            if (_shutDownEvent != null)
            {
                Log.LogVerbose(LogTitle, "----------========== Firing Shut Down Events ==========----------");
                int startTime = Environment.TickCount;

                ShutDownEventDelegate shutDownEvent = _shutDownEvent;

                shutDownEvent(new ShutDownEventArgs());

                int endTime = Environment.TickCount;
                Log.LogVerbose(LogTitle, string.Format("----------========== Done firing Shut Down Events ({0} ms ) ==========----------", endTime - startTime));
            }
        }

        /// <exclude />
        public static void FireDesignChangeEvent()
        {
            var handler = OnDesignChange;

            if (handler != null)
            {
                handler();
            }
        }
    }
}
