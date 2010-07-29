using System;
using System.Collections.Generic;
using System.Linq;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DataScopeManager
    {
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



        public static DataScopeIdentifier MapByType(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            return MapByType(data.DataSourceId.InterfaceType);
        }



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


        // Using thread statis because the request life time cache does not work if a non-asp.net is the invoker /MRJ
        [ThreadStatic]
        private static Stack<DataScopeIdentifier> _dataScopeStack = null;


        private static Stack<DataScopeIdentifier> DataScopeStack
        {
            get
            {
                if (_dataScopeStack == null)
                {
                    var stack = new Stack<DataScopeIdentifier>();

                    _dataScopeStack = stack;

                    return stack;
                }

                return _dataScopeStack;
            }
        }
    }
}
