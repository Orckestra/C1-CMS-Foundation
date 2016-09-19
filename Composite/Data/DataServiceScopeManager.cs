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

        internal static void DisableServices()
        {
            CallContext.SetData(DisableServicesCacheKey, true);
        }

        internal static void EnableServices()
        {
            CallContext.SetData(DisableServicesCacheKey,false);
        }

        internal static object GetService(Type t)
        {
            if (DisableServicesFlag.HasValue && DisableServicesFlag.Value)
                return null;

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
                return CallContext.GetData(ServiceStackCacheKey) as Stack<List<object>>
                    ?? RequestLifetimeCache.GetCachedOrNew<Stack<List<object>>>("DataServiceScopeManager:Stack");
            }
        }

        private static bool? DisableServicesFlag
        {
            get
            {
                return CallContext.GetData(DisableServicesCacheKey) as bool?
                    ?? RequestLifetimeCache.GetCachedOrNew<bool?>("DataServiceScopeManagerServiceDisabled:Bool");
            }
        }

        /// <summary>
        /// Move the stack handling scope to a thread local store, enabling simultaneous threads to mutate (their own) scope. This will be in effect untill the thread has completed.
        /// </summary>
        public static void EnterThreadLocal()
        {
            if (CallContext.GetData(ServiceStackCacheKey) == null)
            {
                var threadLocalStack = new Stack<List<object>>(DataServiceScopeStack);
                CallContext.SetData(ServiceStackCacheKey, threadLocalStack);
            }

            if (CallContext.GetData(DisableServicesCacheKey) == null)
            {
                var threadLocalStackFlag = DisableServicesFlag;
                CallContext.SetData(DisableServicesCacheKey, threadLocalStackFlag);
            }
        }

        /// <summary>
        /// Move the stack handling to request scope.
        /// </summary>
        public static void ExitThreadLocal()
        {
            if (CallContext.GetData(ServiceStackCacheKey) != null)
            {
                CallContext.SetData(ServiceStackCacheKey, null);
            }

            if (CallContext.GetData(DisableServicesCacheKey) != null)
            {
                CallContext.SetData(DisableServicesCacheKey, null);
            }
        }

        private const string ServiceStackCacheKey = "DataServiceScopeManager:ThreadLocal";
        private const string DisableServicesCacheKey = "DataServiceScopeManagerDisableServiceFlag:ThreadLocal";




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