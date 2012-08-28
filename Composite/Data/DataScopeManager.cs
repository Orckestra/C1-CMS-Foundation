using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Caching;


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



        private static Stack<DataScopeIdentifier> DataScopeStack
        {
            get
            {
                return RequestLifetimeCache.GetCachedOrNew<Stack<DataScopeIdentifier>>("DataScopeManager:Stack");
            }
        }
    }
}
