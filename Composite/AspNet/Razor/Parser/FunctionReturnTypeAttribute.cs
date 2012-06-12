using System;

namespace Composite.AspNet.Razor.Parser
{
    /// <summary>    
    /// Attribute that is added to the complited classes from cshtml class
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	[AttributeUsage(AttributeTargets.Class)]
	public class FunctionReturnTypeAttribute : Attribute
	{
        /// <exclude />
		public Type ReturnType { get; set; }

        /// <exclude />
		public FunctionReturnTypeAttribute()
		{
		}

        /// <exclude />
		public FunctionReturnTypeAttribute(Type returnType)
		{
			ReturnType = returnType;
		}
	}
}

