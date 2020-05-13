using System.Collections.Concurrent;
using System.Linq;
using Composite.Functions;
using Microsoft.Extensions.DependencyInjection;

namespace Composite.Plugins.Functions.FunctionProviders.CodeBasedFunctionProvider
{
    /// <summary>
    /// This class allows to register methods from external assemblies as C1 functions.
    /// To register own method for C1 usage:
    /// 1. Register a suitable dependency in an appropriate way in case it is needed
    /// an object for a method call (recommended) <see cref="IServiceCollection"/>
    /// For example:
    /// <code>
    /// public static void ConfigureServices(IServiceCollection collection)
    /// {
    ///     collection.AddSingleTon(typeof(YourServiceType));
    /// }
    /// </code>
    /// 2. Register needed method as C1 function with RegisterMethod call <see cref="RegisterMethod{T}(string, string, string)"/>
    /// </summary>
    public static class CodeBasedFunctionRegistry
    {
        internal static readonly ConcurrentBag<IFunction> Functions = new ConcurrentBag<IFunction>();

        /// <summary>
        /// Provided to register methods from external assemblies as C1 functions
        /// </summary>
        /// <typeparam name="T">Type of a class, which contains the needed method</typeparam>
        /// <param name="methodName">Name of the method to be registered</param>
        /// <param name="userMethodFullName">
        /// Set up custom method full name for displaying in C1.
        /// For example: TestNamespace.TestClassName.TestMethodName
        /// </param>
        /// <param name="description">Can be provided a custom description for the method</param>
        public static void RegisterMethod<T>(string methodName, string userMethodFullName = null, string description = null) where T : class
        {
            var type = typeof(T);

            string userNamespace, userMethodName;

            if (string.IsNullOrWhiteSpace(userMethodFullName))
            {
                userMethodName = methodName;
                userNamespace = type.Namespace;
            }
            else
            {
                ParseFunctionName(userMethodFullName, out userNamespace, out userMethodName);
            }

            var function = CodeBasedFunction.Create(type, methodName, userNamespace, userMethodName, description);
            Functions.Add(function);
            CodeBasedFunctionProvider.Reload();
        }

        private static void ParseFunctionName(string userMethodFullName, out string userNamespace, out string userMethodName)
        {
            string[] parts = userMethodFullName.Split(new[] { '.' });

            Verify.That(parts.Length > 1, "Missing a function namespace in full function name '{0}'", userMethodFullName);

            Verify.IsFalse(parts.Any(string.IsNullOrWhiteSpace), "Empty full name parts are not allowed");

            userNamespace = string.Join(".", parts.Take(parts.Length - 1));
            userMethodName = parts.Last();
        }
    }
}