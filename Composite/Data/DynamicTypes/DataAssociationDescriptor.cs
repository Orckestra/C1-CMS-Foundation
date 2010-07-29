using System;
using System.Xml.Linq;
using Composite.Types;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class DataTypeAssociationDescriptor
	{
        public DataTypeAssociationDescriptor(Type associatedInterfaceType, string foreignKeyPropertyName, DataAssociationType dataAssociationType)
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



        public XElement ToXml()
        {
            XElement element = new XElement("DataTypeAssociationDescriptor");

            element.Add(new XAttribute("associatedInterfaceType", TypeManager.SerializeType(this.AssociatedInterfaceType)));
            element.Add(new XAttribute("foreignKeyPropertyName", this.ForeignKeyPropertyName));
            element.Add(new XAttribute("associationType", this.AssociationType));

            return element;
        }



        public static DataTypeAssociationDescriptor FromXml(XElement element)
        {
            if (element.Name != "DataTypeAssociationDescriptor") throw new ArgumentException("The xml is not correctly formattet");

            XAttribute associatedInterfaceTypeAttribute = element.Attribute("associatedInterfaceType");
            XAttribute foreignKeyPropertyNameAttribute = element.Attribute("foreignKeyPropertyName");
            XAttribute associationTypeAttribute = element.Attribute("associationType");

            if ((associatedInterfaceTypeAttribute == null) || (foreignKeyPropertyNameAttribute == null) || (associatedInterfaceTypeAttribute == null)) throw new ArgumentException("The xml is not correctly formattet");

            Type associatedInterfaceType = TypeManager.GetType(associatedInterfaceTypeAttribute.Value);
            string foreignKeyPropertyName = foreignKeyPropertyNameAttribute.Value;
            DataAssociationType dataAssociationType = (DataAssociationType)Enum.Parse(typeof(DataAssociationType), associationTypeAttribute.Value);

            return new DataTypeAssociationDescriptor(associatedInterfaceType, foreignKeyPropertyName, dataAssociationType);
        }



        public override bool Equals(object obj)
        {
            return Equals(obj as DataTypeAssociationDescriptor);
        }


        public bool Equals(DataTypeAssociationDescriptor dataTypeAssociationDescriptor)
        {
            if (dataTypeAssociationDescriptor == null) return false;

            return
                this.AssociatedInterfaceType == dataTypeAssociationDescriptor.AssociatedInterfaceType &&
                this.ForeignKeyPropertyName == dataTypeAssociationDescriptor.ForeignKeyPropertyName &&
                this.AssociationType == dataTypeAssociationDescriptor.AssociationType;
        }


        public override int GetHashCode()
        {
            return
                this.AssociatedInterfaceType.GetHashCode() ^
                this.ForeignKeyPropertyName.GetHashCode() ^
                this.AssociationType.GetHashCode();
        }
	}
}
