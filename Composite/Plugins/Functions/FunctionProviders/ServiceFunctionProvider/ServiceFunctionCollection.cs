using System.Linq;

namespace Composite.Plugins.Functions.FunctionProviders.ServiceFunctionProvider
{
    /// <summary>
    /// 
    /// </summary>
    public class ServiceFunctionCollection
    {
        internal ServiceFunctionCollection()
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="methodName"></param>
        /// <param name="functionName"></param>
        /// <param name="description"></param>
        /// <typeparam name="T"></typeparam>
        public void RegisterMethod<T>(string methodName, string functionName = null, string description = null) where T: class
        {
            var type = typeof(T);

            string @namespace = null;
            string name = null;

            if (string.IsNullOrWhiteSpace(functionName))
            {
                name = methodName;
                @namespace = type.Namespace;
            }
            else
            {
                ParseFunctionName(functionName, out @namespace, out name);
            }

            var function =  ServiceMethodFunction.Create(type, methodName, @namespace, name, description);

            ServiceFunctionRegistry.Functions.Add(function);

            ServiceFunctionProvider.Reload();
        }


        private static void ParseFunctionName(string functionName, out string ns, out string name)
        {
            string[] parts = functionName.Split(new[] { '.' });

            Verify.That(parts.Length > 1, "Missing a function namespace in function name '{0}'", functionName);

            Verify.IsFalse(parts.Any(string.IsNullOrWhiteSpace), "Empty full name parts is not allowed");

            ns = string.Join(".", parts.Take(parts.Length - 1));
            name = parts.Last();
        }
    }
}
