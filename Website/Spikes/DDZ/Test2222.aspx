<%@ Page Language="C#"  %>
<%@ Import Namespace="Composite.Data" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Xml.Linq" %>
<%@ Import Namespace="Composite.Data.DynamicTypes" %>
<%@ Import Namespace="Composite.Types" %>
<%@ Import Namespace="Composite.Linq" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="System.Reflection" %>

<%

    // Convert page folder types widgets
    foreach (Type pageFolderType in PageFolderFacade.GetAllFolderTypes())
    {
        DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(pageFolderType);

        DataFieldDescriptor dataFieldDescriptor = dataTypeDescriptor.Fields["IAggregationDescriptionIdForeignKey"];
        if (dataFieldDescriptor != null)
        {
            // Use this if the other code does not work
            //dataTypeDescriptor.Fields.Remove(dataFieldDescriptor);
            //DynamicTypeManager.UpdateDataTypeDescriptor(dataTypeDescriptor, false);


            // This might fuck up the post upgrade package
            DataTypeDescriptor oldDataTypeDescriptor = dataTypeDescriptor.Clone();
            dataTypeDescriptor.Fields.Remove(dataFieldDescriptor);

            DataTypeChangeDescriptor dataTypeChangeDescriptor = new DataTypeChangeDescriptor(oldDataTypeDescriptor, dataTypeDescriptor);

            DynamicTypeManager.AlterStore(dataTypeChangeDescriptor, false);
        }
    }
%>