using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Core.Caching;
using System.Runtime.Remoting.Messaging;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class LocalizationScopeManager
    {
        /// <exclude />
        public static CultureInfo CurrentLocalizationScope
        {
            get
            {
                var stack = LocalizationScopeStack;

                if (stack.Count != 0)
                {
                    return stack.Peek();
                }
                
                return CultureInfo.InvariantCulture;
            }
        }



        /// <exclude />
        public static CultureInfo MapByType(Type type)
        {
            if (DataLocalizationFacade.IsLocalized(type) == true)
            {
                return CurrentLocalizationScope;
            }
            
            return CultureInfo.InvariantCulture;
        }



        internal static void PushLocalizationScope(CultureInfo cultureInfo)
        {
            LocalizationScopeStack.Push(cultureInfo);
        }



        internal static void PopLocalizationScope()
        {
            var stack = LocalizationScopeStack;

            if (stack.Count > 0)
            {
                stack.Pop();
            }
        }


        internal static bool IsEmpty
        {
            get
            {
                return (LocalizationScopeStack.Count == 0);
            }
        }



        private const string _threadLocalCacheKey = "LocalizationScopeManager:ThreadLocal";


        /// <summary>
        /// Move the stack handling scope to a thread local store, enabling simultaneous threads to mutate (their own) scope. This will be in effect untill the thread has completed.
        /// </summary>
        public static void EnterThreadLocal()
        {
            if( CallContext.GetData(_threadLocalCacheKey) == null)
            {
                var threadLocalStack = new Stack<CultureInfo>(LocalizationScopeStack);
                CallContext.SetData( _threadLocalCacheKey, threadLocalStack );
            }
        }


        /// <summary>
        /// Move the stack handling to request scope.
        /// </summary>
        public static void ExitThreadLocal()
        {
            if (CallContext.GetData(_threadLocalCacheKey) != null)
            {
                CallContext.SetData(_threadLocalCacheKey, null);
            }
        }


        private static Stack<CultureInfo> LocalizationScopeStack
        {
            get
            {
                var threadLocalStack = CallContext.GetData(_threadLocalCacheKey) as Stack<CultureInfo>;
                if (threadLocalStack != null)
                {
                    return threadLocalStack;
                }

                return RequestLifetimeCache.GetCachedOrNew<Stack<CultureInfo>>("LocalizationScopeManager:Stack");
            }
        }
    }
}
