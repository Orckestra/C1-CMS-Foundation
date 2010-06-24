using System;


namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
	public sealed class FieldPositionAttribute : Attribute
	{
        public FieldPositionAttribute(int position)
        {
            this.Position = position;
        }

        public int Position { get; private set; }
	}
}
