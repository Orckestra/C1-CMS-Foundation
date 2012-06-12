using System;

namespace Composite.AspNet.Razor.Parser
{
	[AttributeUsage(AttributeTargets.Class)]
	public class FunctionReturnTypeAttribute : Attribute
	{
		public Type ReturnType { get; set; }

		public FunctionReturnTypeAttribute()
		{
		}

		public FunctionReturnTypeAttribute(Type returnType)
		{
			ReturnType = returnType;
		}
	}
}
