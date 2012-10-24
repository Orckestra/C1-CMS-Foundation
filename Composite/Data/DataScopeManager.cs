using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Caching;
using System.Threading;
using System.Runtime.Remoting.Messaging;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DataScopeManager
    {
        /// <exclude />
        public static DataScopeIdentifier CurrentDataScope
        {
            get
            {
                var stack = DataScopeStack;

                if (stack.Count != 0)
                {
                    return stack.Peek();
                }
                
                return DataScopeIdentifier.GetDefault();
            }
        }



        /// <exclude />
        public static DataScopeIdentifier MapByType(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            return MapByType(data.DataSourceId.InterfaceType);
        }



        /// <exclude />
        public static DataScopeIdentifier MapByType(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            var currentScope = CurrentDataScope;

            if (DataFacade.GetSupportedDataScopes(interfaceType).Any(f => f.Equals(currentScope)))
            {
                return currentScope;
            }
            return DataScopeIdentifier.GetDefault();
        }



        internal static void PushDataScope(DataScopeIdentifier dataScope)
        {
            DataScopeStack.Push(dataScope);
        }



        internal static void PopDataScope()
        {
            var stack = DataScopeStack;

            if (stack.Count > 0)
            {
                stack.Pop();
            }
        }


        private const string _threadLocalCacheKey = "DataScopeManager:ThreadLocal";


        /// <summary>
        /// Move the stack handling scope to a thread local store, enabling simultanious threads to mutate (their own) scope. This will be in effect untill the thread has completed.
        /// </summary>
        public static void EnterThreadLocal()
        {
            if( CallContext.GetData(_threadLocalCacheKey) == null)
            {
                var threadLocalStack = new Stack<DataScopeIdentifier>( DataScopeStack );
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


        private static Stack<DataScopeIdentifier> DataScopeStack
        {
            get
            {
                var threadLocalStack = CallContext.GetData(_threadLocalCacheKey) as Stack<DataScopeIdentifier>;
                if (threadLocalStack!=null)
                {
                    return threadLocalStack;
                }

                return RequestLifetimeCache.GetCachedOrNew<Stack<DataScopeIdentifier>>("DataScopeManager:Stack");
            }
        }
    }
}
