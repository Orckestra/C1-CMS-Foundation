using System;


namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Interface, AllowMultiple = true, Inherited = true)]
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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



    public enum DataAssociationType
    {
        None,
        Aggregation,
        Composition
    }
}
