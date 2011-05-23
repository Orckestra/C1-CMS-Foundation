using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Constant;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Core.Extensions;

namespace Composite.Functions
{
	/// <summary>    
	/// </summary>
	/// <exclude />
	[System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
	public static class StandardFunctions
	{

		/// <exclude />
		public static IFunction GetDefaultFunctionByType(Type type)
		{
			if (type == typeof (string)) return StandardFunctions.StringFunction;
			if (type == typeof (int) || type == typeof (int?)) return StandardFunctions.IntegerFunction;
			if (type == typeof (Decimal) || type == typeof (Decimal?)) return StandardFunctions.DecimalFunction;
			if (type == typeof (DateTime) || type == typeof (DateTime?)) return StandardFunctions.DateTimeFunction;
			if (type == typeof (Guid) || type == typeof (Guid?)) return StandardFunctions.GuidFunction;
			if (type == typeof (bool) || type == typeof (bool?)) return StandardFunctions.BooleanFunction;

			if (type == typeof (XhtmlDocument)) return StandardFunctions.XhtmlDocumentFunction;

			if (type.IsGenericType)
			{
				if (type.GetGenericTypeDefinition() == typeof (NullableDataReference<>))
				{
					var referenceType = type.GetGenericArguments().First();
					var functionName = StringExtensionMethods.CreateNamespace(referenceType.FullName, "GetNullableDataReference");
					IFunction function;
					if (FunctionFacade.TryGetFunction(out function, functionName))
						return function;
				}
				else if (type.GetGenericTypeDefinition() == typeof (DataReference<>))
				{
					var referenceType = type.GetGenericArguments().First();
					var functionName = StringExtensionMethods.CreateNamespace(referenceType.FullName, "GetDataReference");
					IFunction function;
					if (FunctionFacade.TryGetFunction(out function, functionName))
						return function;
				}
			}

			return null;
		}

		/// <exclude />
		public static IFunction StringFunction { get { return FunctionFacade.GetFunction("Composite.Constant.String"); } }

		/// <exclude />
		public static IFunction DateTimeFunction { get { return FunctionFacade.GetFunction("Composite.Utils.Date.Now"); } }

		/// <exclude />
		public static IFunction BooleanFunction { get { return FunctionFacade.GetFunction("Composite.Constant.Boolean"); } }

		/// <exclude />
		public static IFunction DecimalFunction { get { return FunctionFacade.GetFunction("Composite.Constant.Decimal"); } }

		/// <exclude />
		public static IFunction IntegerFunction { get { return FunctionFacade.GetFunction("Composite.Constant.Integer"); } }

		/// <exclude />
		public static IFunction GuidFunction { get { return FunctionFacade.GetFunction("Composite.Constant.Guid"); } }

		/// <exclude />
		public static IFunction XhtmlDocumentFunction { get { return FunctionFacade.GetFunction("Composite.Constant.XhtmlDocument"); } }
	}
}
