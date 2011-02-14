using System;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
	public sealed class FieldPositionAttribute : Attribute
	{
        /// <exclude />
        public FieldPositionAttribute(int position)
        {
            this.Position = position;
        }

        /// <exclude />
        public int Position { get; private set; }
	}
}
