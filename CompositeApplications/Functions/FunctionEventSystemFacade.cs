using System;
using System.Collections.Generic;

using Composite.EventSystem;
using Composite.Logging;


namespace Composite.Functions
{
    internal static class FunctionEventSystemFacade
    {
        public delegate void FunctionsAddedEventDelegate(FunctionsAddedEventArgs args);
        public delegate void FunctionsRemovedEventDelegate(FunctionsRemovedEventArgs args);
        public delegate void WidgetFunctionsAddedEventDelegate(WidgetFunctionsAddedEventArgs args);
        public delegate void WidgetFunctionsRemovedEventDelegate(WidgetFunctionsRemovedEventArgs args);

        private static event FunctionsAddedEventDelegate _functionsAddedEvent;
        private static event FunctionsRemovedEventDelegate _functionsRemovedEvent;
        private static event WidgetFunctionsAddedEventDelegate _widgetFunctionsAddedEvent;
        private static event WidgetFunctionsRemovedEventDelegate _widgetFunctionsRemovedEvent;

        private static object _lock = new object();


        static FunctionEventSystemFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static void SubscribeToFunctionsAddedEvent(FunctionsAddedEventDelegate functionsAddedEventDelegate)
        {
            lock (_lock)
            {
                _functionsAddedEvent += functionsAddedEventDelegate;
            }
        }



        public static void SubscribeToFunctionsRemovedEvent(FunctionsRemovedEventDelegate functionsRemovedEventDelegate)
        {
            lock (_lock)
            {
                _functionsRemovedEvent += functionsRemovedEventDelegate;
            }
        }



        public static void SubscribeToWidgetFunctionsAddedEvent(WidgetFunctionsAddedEventDelegate widgetFunctionsAddedEventDelegate)
        {
            lock (_lock)
            {
                _widgetFunctionsAddedEvent += widgetFunctionsAddedEventDelegate;
            }
        }



        public static void SubscribeToWidgetFunctionsRemovedEvent(WidgetFunctionsRemovedEventDelegate widgetFunctionsRemovedEventDelegate)
        {
            lock (_lock)
            {
                _widgetFunctionsRemovedEvent += widgetFunctionsRemovedEventDelegate;
            }
        }



        public static void FireFunctionAddedEvent(FunctionsAddedEventArgs functionsAddedEventArgs)
        {
            lock (_lock)
            {
                if (_functionsAddedEvent != null)
                {
                    FunctionsAddedEventDelegate functionsAddedEvent = _functionsAddedEvent;

                    functionsAddedEvent(functionsAddedEventArgs);
                }
            }
        }



        public static void FireFunctionRemovedEvent(FunctionsRemovedEventArgs functionsRemovedEventArgs)
        {
            lock (_lock)
            {
                if (_functionsRemovedEvent != null)
                {
                    FunctionsRemovedEventDelegate functionsRemovedEvent = _functionsRemovedEvent;

                    functionsRemovedEvent(functionsRemovedEventArgs);
                }
            }
        }



        public static void FireWidgetFunctionAddedEvent(WidgetFunctionsAddedEventArgs widgetFunctionsAddedEventArgs)
        {
            lock (_lock)
            {
                if (_widgetFunctionsAddedEvent != null)
                {
                    WidgetFunctionsAddedEventDelegate widgetFunctionsAddedEvent = _widgetFunctionsAddedEvent;

                    widgetFunctionsAddedEvent(widgetFunctionsAddedEventArgs);
                }
            }
        }



        public static void FireWidgetFunctionRemovedEvent(WidgetFunctionsRemovedEventArgs widgetFunctionsRemovedEventArgs)
        {
            lock (_lock)
            {
                if (_widgetFunctionsRemovedEvent != null)
                {
                    WidgetFunctionsRemovedEventDelegate widgetFunctionsRemovedEvent = _widgetFunctionsRemovedEvent;

                    widgetFunctionsRemovedEvent(widgetFunctionsRemovedEventArgs);
                }
            }
        }



        private static void Flush()
        {
            lock (_lock)
            {
                _functionsAddedEvent = null;
                _functionsRemovedEvent = null;
                _widgetFunctionsAddedEvent = null;
                _widgetFunctionsRemovedEvent = null;
            }
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
    }





    public sealed class FunctionsAddedEventArgs : EventArgs
    {
        internal FunctionsAddedEventArgs(List<string> functionsAdded)
        {
            this.FunctionsAdded = functionsAdded;
        }


        public List<string> FunctionsAdded
        {
            get;
            private set;
        }
    }



    public sealed class FunctionsRemovedEventArgs : EventArgs
    {
        internal FunctionsRemovedEventArgs(List<string> functionsRemoved)
        {
            this.FunctionsRemoved = functionsRemoved;
        }


        public List<string> FunctionsRemoved
        {
            get;
            private set;
        }
    }



    public sealed class WidgetFunctionsAddedEventArgs : EventArgs
    {
        internal WidgetFunctionsAddedEventArgs(List<string> widgetFunctionsAdded)
        {
            this.WidgetFunctionsAdded = widgetFunctionsAdded;
        }


        public List<string> WidgetFunctionsAdded
        {
            get;
            private set;
        }
    }



    public sealed class WidgetFunctionsRemovedEventArgs : EventArgs
    {
        internal WidgetFunctionsRemovedEventArgs(List<string> widgetFunctionsRemoved)
        {
            this.WidgetFunctionsRemoved = widgetFunctionsRemoved;
        }


        public List<string> WidgetFunctionsRemoved
        {
            get;
            private set;
        }
    }
}
