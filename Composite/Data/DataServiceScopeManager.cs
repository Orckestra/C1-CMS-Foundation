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
            DataServiceScopeStack.Peek().Add(service);
        }

        internal static object GetService(Type t)
        {
            var stack = DataServiceScopeStack.GetEnumerator();
            while (stack.MoveNext())
            {
                if (stack.Current?.Find(f => f.GetType() == t) != null)
                {
                    return stack.Current.Last(f => f.GetType() == t);
                }
            }
            return null;
        }

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
            DataServiceScopeStack.Pop();
        }
        internal static void PushDataServiceScope()
        {
            DataServiceScopeStack.Push(new List<object>());
        }
    }
}
