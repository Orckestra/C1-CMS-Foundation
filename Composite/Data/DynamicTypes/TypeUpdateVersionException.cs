using System;


namespace Composite.Data.DynamicTypes
{
	public sealed class TypeUpdateVersionException : Exception
	{
        public TypeUpdateVersionException(string message)
            : base(message)
        {
        }
	}
}
