using System;
using System.Collections.Generic;
using System.Linq;
using System.Workflow.Activities;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Core.PageTemplates;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Core.Types;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core.Xml;


namespace Composite.Plugins.Elements.ElementProviders.VisualFunctionProviderElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewVisualFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddNewVisualFunctionWorkflow()
        {
            InitializeComponent();
        }


        private void CheckPageTemplatesExists(object sender, ConditionalEventArgs e)
        {
            e.Result = PageTemplateFacade.ValidTemplateExists;
        }



        private void CheckActiveLanguageExists(object sender, ConditionalEventArgs e)
        {
            e.Result = UserSettings.ActiveLocaleCultureInfo != null;
        }



        private void MissingActiveLanguageActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(
                DialogType.Message,
                StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", "AddNew.MissingActiveLanguageTitle"),
                StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", "AddNew.MissingActiveLanguageMessage"));
        }



        private void stepInitialize_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            List<Type> dataTypes = DataFacade.GetAllInterfaces(UserType.Developer);
            dataTypes.RemoveAll(t => t.FullName.StartsWith("Composite.Data.Types"));

            this.Bindings = new Dictionary<string, object>
            {
                {"SelectedType", typeof (IData)},
                {"TypeOptions", dataTypes}
            };
        }



        private void prepareFunctionObject_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataTypeDescriptor dataTypeDescriptor = GetDataTypeDescriptor();

            var function = DataFacade.BuildNew<IVisualFunction>();

            function.Id = Guid.NewGuid();
            function.Name = FunctionFacade.BuildUniqueFunctionName(dataTypeDescriptor.Namespace, string.Format("{0}Rendering", dataTypeDescriptor.Name));
            function.Namespace = dataTypeDescriptor.Namespace;
            function.TypeManagerName = dataTypeDescriptor.TypeManagerTypeName;
            function.Description = "";

            this.UpdateBinding("Function", function);
        }



        private DataTypeDescriptor GetDataTypeDescriptor()
        {
            Type sourceDataType = GetSourceDataType();

            DataTypeDescriptor dataTypeDescriptor = null;
            if (DynamicTypeManager.TryGetDataTypeDescriptor(sourceDataType, out dataTypeDescriptor) == false)
            {
                dataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(sourceDataType);
            }

            return dataTypeDescriptor;
        }



        private Type GetSourceDataType()
        {
            return this.GetBinding<Type>("SelectedType");
        }



        private void stepFinalize_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher updateTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IVisualFunction newFunction = this.GetBinding<IVisualFunction>("Function");

            newFunction.MaximumItemsToList = 10;
            newFunction.OrderbyAscending = true;
            newFunction.OrderbyFieldName = (GetDataTypeDescriptor().LabelFieldName ?? GetDataTypeDescriptor().Fields.First().Name);

            XhtmlDocument defaultDocument = BuildDefaultDocument(newFunction);

            newFunction.XhtmlTemplate = defaultDocument.ToString();

            updateTreeRefresher.PostRefreshMesseges(this.EntityToken);

            var createdFunction = DataFacade.AddNew<IVisualFunction>(newFunction);

            this.ExecuteWorklow(createdFunction.GetDataEntityToken(), typeof(EditVisualFunctionWorkflow));
        }

        private static XhtmlDocument BuildDefaultDocument(IVisualFunction newFunction)
        {
            XElement htmlTable = new XElement(Namespaces.Xhtml + "table");

            Type interfaceType = TypeManager.GetType(newFunction.TypeManagerName);
            DataTypeDescriptor typeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);
            foreach (DataFieldDescriptor dataField in typeDescriptor.Fields.OrderBy(f => f.Position))
            {
                if (!typeDescriptor.KeyPropertyNames.Contains(dataField.Name)
                    && dataField.FormRenderingProfile != null 
                    && !string.IsNullOrEmpty(dataField.FormRenderingProfile.Label))
                {
                    string fieldMarkup = string.Format("<data:fieldreference fieldname=\"{0}\" typemanagername=\"{1}\" xmlns:data=\"{2}\" />", dataField.Name, newFunction.TypeManagerName, Namespaces.DynamicData10);

                    htmlTable.Add(new XElement(Namespaces.Xhtml + "tr",
                        new XElement(Namespaces.Xhtml + "td",
                            dataField.FormRenderingProfile.Label),
                        new XElement(Namespaces.Xhtml + "td",
                            XElement.Parse(fieldMarkup))));
                }
            }
            XhtmlDocument defaultDocument = new XhtmlDocument();
            defaultDocument.Body.Add(htmlTable);
            return defaultDocument;
        }



        private void CheckFunctionNameIsUnique(object sender, ConditionalEventArgs e)
        {
            IVisualFunction function = this.GetBinding<IVisualFunction>("Function");

            string functionFullName = $"{function.Namespace}.{function.Name}";

            e.Result = !FunctionFacade.FunctionNames.Contains(functionFullName);
        }



        private void CheckDataExists(object sender, ConditionalEventArgs e)
        {
            Type type = GetSourceDataType();

            e.Result = DataFacade.GetData(type).Any();
        }


        private void CheckTypesExists(object sender, ConditionalEventArgs e)
        {
            e.Result = (this.GetBinding<List<Type>>("TypeOptions")).Count > 0;
        }


        private void CheckTypeNameIsDynamicType(object sender, ConditionalEventArgs e)
        {
            Type type = GetSourceDataType();

            Guid immutableTypeId;

            e.Result = type != null && type.TryGetImmutableTypeId(out immutableTypeId);
        }
    }
}
