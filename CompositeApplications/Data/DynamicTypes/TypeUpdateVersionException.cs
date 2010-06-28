using System;


namespace Composite.Data.DynamicTypes
{
	internal sealed class TypeUpdateVersionException : Exception
	{
        public TypeUpdateVersionException(string message)
            : base(message)
        {
        }
	}
}
