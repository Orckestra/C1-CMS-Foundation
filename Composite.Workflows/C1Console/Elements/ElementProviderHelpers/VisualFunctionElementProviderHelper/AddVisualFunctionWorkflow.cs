using System;
using System.Linq;
using System.Workflow.Activities;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Core.Types;
using Composite.C1Console.Workflow;
using Composite.Core.Xml;


namespace Composite.C1Console.Elements.ElementProviderHelpers.VisualFunctionElementProviderHelper
{
    public sealed partial class AddVisualFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public AddVisualFunctionWorkflow()
        {
            InitializeComponent();
        }



        private void CheckFunctionNameIsUnique(object sender, ConditionalEventArgs e)
        {
            IVisualFunction function = this.GetBinding<IVisualFunction>("Function");

            string functionName = function.Name;
            string functionNamespace = function.Namespace;

            if (FunctionFacade.FunctionNames.Contains(string.Format("{0}.{1}", functionNamespace, functionName)))
            {
                e.Result = false;
            }
            else
            {
                e.Result = true;
            }
        }



        private void step1CodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            IData data = ((DataEntityToken)this.EntityToken).Data;

            IVisualFunction function = DataFacade.BuildNew<IVisualFunction>();

            function.Id = Guid.NewGuid();
            function.Name = FunctionFacade.BuildUniqueFunctionName(data.DataSourceId.InterfaceType.Namespace, string.Format("{0}Rendering", data.DataSourceId.InterfaceType.Name));
            function.Namespace = data.DataSourceId.InterfaceType.Namespace;
            function.TypeManagerName = TypeManager.SerializeType(data.DataSourceId.InterfaceType);
            function.Description = "";

            this.UpdateBinding("Function", function);
        }



        private void finalizeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            IVisualFunction function = this.GetBinding<IVisualFunction>("Function");

            IData data = ((DataEntityToken)this.EntityToken).Data;

            DataTypeDescriptor dataTypeDescriptor = null;
            if (DynamicTypeManager.TryGetDataTypeDescriptor(data.DataSourceId.InterfaceType, out dataTypeDescriptor) == false)
            {
                dataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(data.DataSourceId.InterfaceType);
            }

            function.MaximumItemsToList = 50;
            function.OrderbyAscending = true;
            function.OrderbyFieldName = (dataTypeDescriptor.LabelFieldName ?? dataTypeDescriptor.Fields.First().Name);
            function.XhtmlTemplate = BuildDefaultXhtml(dataTypeDescriptor);


            function = DataFacade.AddNew<IVisualFunction>(function);

            addNewTreeRefresher.PostRefreshMesseges(function.GetDataEntityToken());

            this.ExecuteAction(function.GetDataEntityToken(), new WorkflowActionToken(typeof(EditVisualFunctionWorkflow)));
        }



        private string BuildDefaultXhtml(DataTypeDescriptor typeDescriptor)
        {
            XElement table =
                new XElement(Namespaces.Xhtml + "table",
                    new XAttribute("class", "GeneratedVisualFunction"));            

            foreach (DataFieldDescriptor field in typeDescriptor.Fields)
            {
                string label;
                if (field.FormRenderingProfile != null && string.IsNullOrEmpty(field.FormRenderingProfile.Label) == false)
                {
                    label = field.FormRenderingProfile.Label;
                }
                else
                {
                    label = field.Name;
                }

                table.Add(
                    new XElement(Namespaces.Xhtml + "tr",
                        new XElement(Namespaces.Xhtml + "th", label),
                        new XElement(Namespaces.Xhtml + "td",
                            field.GetReferenceElement(typeDescriptor))));

            }

            XhtmlDocument document = new XhtmlDocument();

            document.Body.Add(table);

            return document.ToString();
        }
    }
}
