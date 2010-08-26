using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;
using Composite.Functions;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Plugins.Functions.FunctionProviders.VisualFunctionProvider;
using Composite.Core.Types;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.C1Console.Workflow;
using Composite.Core.Xml;
using Composite.C1Console.Users;


namespace Composite.C1Console.Elements.ElementProviderHelpers.VisualFunctionElementProviderHelper
{
    public sealed partial class EditVisualFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditVisualFunctionWorkflow()
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



        private void initializeCodeActivity_Initialize_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken token = (DataEntityToken)this.EntityToken;
            IVisualFunction function = (IVisualFunction)token.Data;

            XhtmlDocument template = XhtmlDocument.Parse(function.XhtmlTemplate);

            string bodyInnerHtml = string.Concat((template.Body.Elements().Select(b => b.ToString())).ToArray());

            this.Bindings.Add("Function", function);
            this.Bindings.Add("XhtmlBody", bodyInnerHtml);

            Type interfaceType = TypeManager.GetType(function.TypeManagerName);
            DataTypeDescriptor typeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);

            this.Bindings.Add("EmbedableFieldsTypes", new List<Type> { interfaceType });
            this.Bindings.Add("SourceTypeFullName", interfaceType.FullName);

            this.Bindings.Add("FieldNameList", FieldNames(typeDescriptor));

            IEnumerable templateInfos =
                (from previewTemplate in DataFacade.GetData<IPageTemplate>()
                 select new { previewTemplate.Id, previewTemplate.Title }).ToList();

            this.Bindings.Add("PreviewTemplateId", Guid.Empty);
            this.Bindings.Add("TemplateList", templateInfos);
        }



        private void editCodeActivity_Preview_ExecuteCode(object sender, EventArgs e)
        {
            try
            {
                XhtmlDocument templateDocument = GetTemplateDocumentFromBindings();

                IVisualFunction function = this.GetBinding<IVisualFunction>("Function");
                Type interfaceType = TypeManager.GetType(function.TypeManagerName);

                DataTypeDescriptor typeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);

                this.LogMessage(Composite.Core.Logging.LogLevel.Info, DataScopeManager.CurrentDataScope.Name);

                FunctionContextContainer fcc = PageRenderer.GetPageRenderFunctionContextContainer();

                XhtmlDocument result = RenderingHelper.RenderCompleteDataList(function, templateDocument, typeDescriptor, fcc);

                IPage previewPage = DataFacade.BuildNew<IPage>();
                previewPage.Title = function.Name;
                previewPage.CultureName = UserSettings.CultureInfo.Name;

                previewPage.TemplateId = this.GetBinding<Guid>("PreviewTemplateId");

                IPagePlaceholderContent placeHolderContent = DataFacade.BuildNew<IPagePlaceholderContent>();
                placeHolderContent.Content = string.Concat((result.Body.Elements().Select(b => b.ToString())).ToArray());
                placeHolderContent.PlaceHolderId = "content";

                Control renderedPage = previewPage.Render(new List<IPagePlaceholderContent> { placeHolderContent }, fcc);
                PageRenderer.DisableAspNetPostback(renderedPage);

                FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

                var webRenderService = serviceContainer.GetService<IFormFlowWebRenderingService>();
                webRenderService.SetNewPageOutput(renderedPage);
            }
            catch (Exception ex)
            {
                FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
                Control errOutput = new LiteralControl("<pre>" + ex.ToString() + "</pre>");
                var webRenderService = serviceContainer.GetService<IFormFlowWebRenderingService>();
                webRenderService.SetNewPageOutput(errOutput);
            }            
        }



        private void saveCodeActivity_Save_ExecuteCode(object sender, EventArgs e)
        {
            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            XhtmlDocument templateDocument = GetTemplateDocumentFromBindings();

            IVisualFunction function = this.GetBinding<IVisualFunction>("Function");
            function.XhtmlTemplate = templateDocument.ToString();

            DataFacade.Update(function);

            SetSaveStatus(true);

            updateTreeRefresher.PostRefreshMesseges(function.GetDataEntityToken());
        }



        private XhtmlDocument GetTemplateDocumentFromBindings()
        {
            string bodyInnerHtml = this.GetBinding<string>("XhtmlBody");

            XElement tempBodyElement = XElement.Parse("<body xmlns='" + Namespaces.Xhtml + "'>" + bodyInnerHtml + "</body>");
            XhtmlDocument templateDocument = new XhtmlDocument();
            templateDocument.Body.Add(tempBodyElement.Elements());

            return templateDocument;
        }



        private IEnumerable<string> FieldNames(DataTypeDescriptor typeDescriptor)
        {
            yield return "(random)";

            foreach (DataFieldDescriptor dataField in typeDescriptor.Fields.OrderBy(f => f.Position))
            {
                yield return dataField.Name;
            }
        }      
    }
}
