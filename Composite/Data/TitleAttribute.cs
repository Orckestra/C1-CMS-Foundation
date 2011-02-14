using System;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = false, Inherited = false)]
	public sealed class TitleAttribute : Attribute
	{
        /// <exclude />
        public TitleAttribute(string title)
        {
            this.Title = title;
        }


        /// <exclude />
        public string Title
        {
            get;
            private set;
        }
	}
}
