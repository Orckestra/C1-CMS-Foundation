using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using Composite.Core.Caching;

namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class DataServiceScopeManager
    {
        internal static void AddService(object service)
        {
            var serviceStack = DataServiceScopeStack?.Peek();
            Verify.IsNotNull(serviceStack, "The data service stack was not pushed before use");

            serviceStack.Add(service);
        }

        internal static void AddDefaultService(object service)
        {
            DataServiceDefaultList.Add(service);
        }

        internal static object GetService(Type t)
        {
            foreach(var serviceList in DataServiceScopeStack)
            {
                var match = serviceList?.FindLast(f => f.GetType() == t);
                if (match != null)
                {
                    return match;
                }
            }

            return DataServiceDefaultList.Last(f => f.GetType() == t);
        }

        private static readonly List<object> DataServiceDefaultList = new List<object>();
         
        private static Stack<List<object>> DataServiceScopeStack
        {
            get
            {
                return CallContext.GetData(ThreadLocalCacheKey) as Stack<List<object>>
                    ?? RequestLifetimeCache.GetCachedOrNew<Stack<List<object>>>("DataServiceScopeManager:Stack");
            }
        }

        /// <summary>
        /// Move the stack handling scope to a thread local store, enabling simultaneous threads to mutate (their own) scope. This will be in effect untill the thread has completed.
        /// </summary>
        public static void EnterThreadLocal()
        {
            if (CallContext.GetData(ThreadLocalCacheKey) == null)
            {
                var threadLocalStack = new Stack<List<object>>(DataServiceScopeStack);
                CallContext.SetData(ThreadLocalCacheKey, threadLocalStack);
            }
        }


        /// <summary>
        /// Move the stack handling to request scope.
        /// </summary>
        public static void ExitThreadLocal()
        {
            if (CallContext.GetData(ThreadLocalCacheKey) != null)
            {
                CallContext.SetData(ThreadLocalCacheKey, null);
            }
        }

        private const string ThreadLocalCacheKey = "DataServiceScopeManager:ThreadLocal";


        

        internal static void PopDataServiceScope()
        {
            Verify.That(DataServiceScopeStack.Count > 0, nameof(DataServiceScopeStack) + " underflow");

            DataServiceScopeStack.Pop();
        }

        internal static void PushDataServiceScope()
        {
            DataServiceScopeStack.Push(new List<object>());
        }
    }
}
