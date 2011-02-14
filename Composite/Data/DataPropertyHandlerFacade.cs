using System;
using System.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Core.Logging;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DataPropertyHandlerFacade
    {
        private static Dictionary<Type, ISetPropertyHandler> _setPropertyHandlers = new Dictionary<Type, ISetPropertyHandler>();



        static DataPropertyHandlerFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        /// <exclude />
        public static void HandleSet<T>(IData data, object value)
            where T : ISetPropertyHandler
        {
            HandleSet(typeof(T), data, value);
        }



        /// <exclude />
        public static void HandleSet(Type setPropertyHandlerType, IData data, object value)
        {
            if (setPropertyHandlerType == null) throw new ArgumentNullException("setPropertyHandler");
            if (typeof(ISetPropertyHandler).IsAssignableFrom(setPropertyHandlerType) == false) throw new ArgumentException(string.Format("setPropertyHanlder does not implement the interface '{0}", typeof(ISetPropertyHandler)));
            if (data == null) throw new ArgumentNullException("data");

            ISetPropertyHandler setPropertyHandler = GetSetPropertyHandler(setPropertyHandlerType);

            setPropertyHandler.Handle(data, value);
        }



        private static ISetPropertyHandler GetSetPropertyHandler(Type setPropertyHandlerType)
        {
            ISetPropertyHandler handler;
            if (_setPropertyHandlers.TryGetValue(setPropertyHandlerType, out handler) == false)
            {
                handler = (ISetPropertyHandler)Activator.CreateInstance(setPropertyHandlerType, new object[] { });

                _setPropertyHandlers.Add(setPropertyHandlerType, handler);
            }

            return handler;
        }



        private static void Flush()
        {
            _setPropertyHandlers = new Dictionary<Type, ISetPropertyHandler>();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
    }
}
