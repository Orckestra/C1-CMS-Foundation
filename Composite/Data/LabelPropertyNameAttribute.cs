using System;


namespace Composite.Data
{
#warning RELEASE: Missing documentation
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = true)]
	public sealed class LabelPropertyNameAttribute : Attribute
	{
        public LabelPropertyNameAttribute(string propertyName)
        {
            this.PropertyName = propertyName;
        }


        public string PropertyName
        {
            get;
            private set;
        }
	}
}
