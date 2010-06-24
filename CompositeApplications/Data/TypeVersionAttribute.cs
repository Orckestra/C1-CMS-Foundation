using System;


namespace Composite.Data
{
    public sealed class TypeVersionAttribute : Attribute
	{
        public TypeVersionAttribute(int version)
        {
            this.Version = version;
        }

        public int Version { get; private set; }
	}
}
