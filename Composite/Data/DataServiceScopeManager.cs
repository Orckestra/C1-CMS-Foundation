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
                var threadLocalStack = CallContext.GetData(ThreadLocalCacheKey) as Stack<List<object>>;
                if (threadLocalStack != null)
                {
                    return threadLocalStack;
                }

                return RequestLifetimeCache.GetCachedOrNew<Stack<List<object>>>("DataServiceScopeManager:Stack");
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
