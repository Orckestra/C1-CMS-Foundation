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
        public DataAssociationAttribute(Type associatedInterfaceType, string foreignKeyPropertyName, DataAssociationType dataAssociationType)
        {
            this.AssociatedInterfaceType = associatedInterfaceType;
            this.ForeignKeyPropertyName = foreignKeyPropertyName;
            this.AssociationType = dataAssociationType;
        }
        

        public Type AssociatedInterfaceType
        {
            get;
            private set;
        }


        public string ForeignKeyPropertyName
        {
            get;
            private set;
        }


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
        None,
        Aggregation,
        Composition
    }
}
