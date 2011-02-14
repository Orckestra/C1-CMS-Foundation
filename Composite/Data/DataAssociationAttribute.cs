using System;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]    
    public sealed class DataAssociationAttribute : Attribute
	{
        /// <exclude />
        public DataAssociationAttribute(Type associatedInterfaceType, string foreignKeyPropertyName, DataAssociationType dataAssociationType)
        {
            this.AssociatedInterfaceType = associatedInterfaceType;
            this.ForeignKeyPropertyName = foreignKeyPropertyName;
            this.AssociationType = dataAssociationType;
        }


        /// <exclude />
        public Type AssociatedInterfaceType
        {
            get;
            private set;
        }


        /// <exclude />
        public string ForeignKeyPropertyName
        {
            get;
            private set;
        }


        /// <exclude />
        public DataAssociationType AssociationType
        {
            get;
            private set;
        }
	}



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum DataAssociationType
    {
        /// <exclude />
        None = 0,

        /// <exclude />
        Aggregation = 1,

        /// <exclude />
        Composition = 2
    }
}
