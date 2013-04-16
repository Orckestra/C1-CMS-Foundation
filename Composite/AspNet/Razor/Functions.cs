using System;
using System.Collections.Generic;
using System.ComponentModel;
using Composite.Functions;
using Composite.Core.Extensions;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// Utility class for working with C1 functions from Razor code
    /// </summary>
	public static class Functions
	{
        /// <summary>
        /// Executes the function.
        /// </summary>
        /// <param name="name">The name.</param>
		public static object ExecuteFunction(string name)
		{
			return ExecuteFunction(name, null);
		}

        /// <summary>
        /// Executes the function.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="parameters">The parameters.</param>
        /// <returns></returns>
		public static object ExecuteFunction(string name, object parameters)
		{
			return ExecuteFunction(name, ObjectToDictionary(parameters));
		}

        /// <summary>
        /// Executes the function.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="parameters">The parameters.</param>
        /// <returns></returns>
		public static object ExecuteFunction(string name, IDictionary<string, object> parameters)
		{
            return ExecuteFunction(name, parameters, new FunctionContextContainer());
		}

        /// <summary>
        /// Executes the function.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <param name="parameters">The parameters.</param>
        /// <param name="functionContextContainer">The function context container</param>
        /// <returns></returns>
        public static object ExecuteFunction(string name, IDictionary<string, object> parameters, FunctionContextContainer functionContextContainer)
        {
            IFunction function;
            if (!FunctionFacade.TryGetFunction(out function, name))
            {
                throw new InvalidOperationException("Failed to load function '{0}'".FormatWith(name));
            }

            functionContextContainer = functionContextContainer ?? new FunctionContextContainer();

            return FunctionFacade.Execute<object>(function, parameters, functionContextContainer);
        }

        /// <summary>
        /// Builds a dictionary for object properties' values.
        /// </summary>
        /// <param name="instance">The instance.</param>
        /// <returns></returns>
		public static IDictionary<string, object> ObjectToDictionary(object instance)
		{
			if (instance == null)
			{
				return null;
			}

			var dictionary = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);

			foreach (PropertyDescriptor descriptor in TypeDescriptor.GetProperties(instance))
			{
				object obj = descriptor.GetValue(instance);

				dictionary.Add(descriptor.Name, obj);
			}

			return dictionary;
		}
	}
}
