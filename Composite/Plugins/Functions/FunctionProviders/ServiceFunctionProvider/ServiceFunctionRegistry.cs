using System.Collections.Generic;
using Composite.Functions;

namespace Composite.Plugins.Functions.FunctionProviders.ServiceFunctionProvider
{
    /// <summary>
    /// 
    /// </summary>
    public static class ServiceFunctionRegistry
    {
        private static readonly List<ServiceFunctionCollection> FunctionCollections = new List<ServiceFunctionCollection>();

        internal static IList<IFunction> Functions = new List<IFunction>();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static ServiceFunctionCollection NewFunctionCollection()
        {
            var result = new ServiceFunctionCollection();
            FunctionCollections.Add(result);

            return result;
        }
    }
}
