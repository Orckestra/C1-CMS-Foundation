using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using System.Collections.Generic;
using Composite.Functions;
using Composite.Data.GeneratedTypes;
using Composite.Data;
using Composite.Transactions;
using Composite.Types;


public partial class Spikes_MAW_CreateInlineDynamicType : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {        
        // Page we add the data composition to
/*        IPage targetData = DataFacade.GetData<IPage>(p => p.ParentId == Guid.Empty).First();

        // The "fan" on page edit where users should edit the new type data ( Currently the "Meta data" fan)
        Dictionary<Guid, string> compositionContainers = DataCompositionVisabilityFacade.GetCompositionContainers();
        Guid compositionContainerId = compositionContainers.First().Key;


        // Info about the type we wish to create
        string typeName = "MyPageInlineDataType";
        string typeNamespace = "MyNameSpace.MySubNamespace";
        string typeTitle = "This is a pretty title for this type";
        bool hasRecycleBin = true;
        bool hasVersioning = false;
        bool hasPublishing = true;
        string labelFieldName = "Name";  // this should be the name of one of the data fields - the one thats best used as a label...

        List<DataFieldDescriptor> dataFieldDescriptors = new List<DataFieldDescriptor>();

        // Take care of reference field to IPage
        DataTypeDescriptor targetDataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeof(IPage));
        DataFieldDescriptor typeForeignKeyDataFieldDescriptor = CreateReferenceDataFieldDescriptor(targetDataTypeDescriptor);
        dataFieldDescriptors.Add(typeForeignKeyDataFieldDescriptor);

        // Create a "composition rule" field, making this an inline field
        DataTypeDescriptor compositionRuleDataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeof(ICompositionDescription));
        DataFieldDescriptor compositionRuleForeignKeyDataFieldDescriptor = CreateReferenceDataFieldDescriptor(compositionRuleDataTypeDescriptor);
        dataFieldDescriptors.Add(compositionRuleForeignKeyDataFieldDescriptor);

        // Create the actual data fields
        DataFieldDescriptor fieldDescriptor1 = new DataFieldDescriptor(Guid.NewGuid(), "Name", StoreFieldType.String(128), typeof(string));
        fieldDescriptor1.Position = 1;
        fieldDescriptor1.FormRenderingProfile.Label = "Name";
        fieldDescriptor1.FormRenderingProfile.HelpText = "Write the name here...";
        fieldDescriptor1.FormRenderingProfile.WidgetFunctionMarkup = StandardWidgetFunctions.TextBoxWidget.SerializedWidgetFunction.ToString();
        dataFieldDescriptors.Add(fieldDescriptor1);

        DataFieldDescriptor fieldDescriptor2 = new DataFieldDescriptor(Guid.NewGuid(), "Address", StoreFieldType.String(256), typeof(string));
        fieldDescriptor2.Position = 2;
        fieldDescriptor2.FormRenderingProfile.Label = "Address";
        fieldDescriptor2.FormRenderingProfile.HelpText = "Write the address here...";
        fieldDescriptor2.FormRenderingProfile.WidgetFunctionMarkup = StandardWidgetFunctions.TextAreaWidget.SerializedWidgetFunction.ToString();
        dataFieldDescriptors.Add(fieldDescriptor2);
        */
        /*
        // Create a data type descriptor
        DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.CreateDataTypeDescriptor(typeNamespace, typeName, typeTitle, dataFieldDescriptors, hasRecycleBin, hasVersioning, hasPublishing, labelFieldName);

        // "compile" the new type
        GeneratedTypesFacade.GenerateNewType(dataTypeDescriptor);


        // transaction control would be really well used here - consider introducing it.

        //using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
        //{
            Type interfaceType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

            DataAssociationVisabilityRule allRule = DataAssociationVisabilityRule.All(compositionContainerId, "AddressInfo", "Address info");

            // create a "composition rule"
            DataCompositionVisabilityFacade.AddCompositionDescription(targetData, interfaceType, allRule);

            string foreignKeyPropertyName =
                (from dfd in dataFieldDescriptors
                 where dfd.ForeignKeyReferenceTypeName == targetDataTypeDescriptor.TypeManagerTypeName
                 select dfd.Name).First();

            DataTypeAssociationDescriptor dataTypeAssociationDescriptor = new DataTypeAssociationDescriptor(
                    targetData.DataSourceId.InterfaceType,
                    foreignKeyPropertyName,
                    DataAssociationType.Composition
                );

            dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(dataTypeDescriptor.DataTypeId);

            dataTypeDescriptor.DataAssociations.Add(dataTypeAssociationDescriptor);

            DynamicTypeManager.UpdateDataTypeDescriptor(dataTypeDescriptor);

        //    transactionScope.Complete();
        //}*/
    }



    private DataFieldDescriptor CreateReferenceDataFieldDescriptor(DataTypeDescriptor targetDataTypeDescriptor)
    {
        Type targetType = TypeManager.GetType(targetDataTypeDescriptor.TypeManagerTypeName);
        string targetKeyPropertyName = targetDataTypeDescriptor.KeyPropertyNames.First();

        DataFieldDescriptor targetKeyDataFieldDescriptor = targetDataTypeDescriptor.Fields[targetKeyPropertyName];

        DataFieldDescriptor dataFieldDescriptor = new DataFieldDescriptor(
                        Guid.NewGuid(),
                        string.Format("{0}{1}ForeignKey", targetDataTypeDescriptor.Name, targetKeyPropertyName),
                        targetKeyDataFieldDescriptor.StoreType,
                        targetKeyDataFieldDescriptor.InstanceType
                    );
        dataFieldDescriptor.IsNullable = targetKeyDataFieldDescriptor.IsNullable;
        dataFieldDescriptor.DefaultValue = targetKeyDataFieldDescriptor.DefaultValue;
        dataFieldDescriptor.ValidationFunctionMarkup = targetKeyDataFieldDescriptor.ValidationFunctionMarkup;
        dataFieldDescriptor.ForeignKeyReferenceTypeName = targetDataTypeDescriptor.TypeManagerTypeName;

        WidgetFunctionProvider widgetFunctionProvider = StandardWidgetFunctions.GetDataReferenceWidget(targetType);

        DataFieldFormRenderingProfile dataFieldFormRenderingProfile = new DataFieldFormRenderingProfile
        {
            Label = dataFieldDescriptor.Name,
            HelpText = dataFieldDescriptor.Name,
            WidgetFunctionMarkup = widgetFunctionProvider.SerializedWidgetFunction.ToString(SaveOptions.DisableFormatting)
        };

        dataFieldDescriptor.FormRenderingProfile = dataFieldFormRenderingProfile;

        return dataFieldDescriptor;
    }

}
