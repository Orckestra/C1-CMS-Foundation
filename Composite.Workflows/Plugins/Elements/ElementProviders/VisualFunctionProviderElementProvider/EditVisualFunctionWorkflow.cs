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
using Composite.Core.WebClient.Renderings.Template;
using Composite.Plugins.Functions.FunctionProviders.VisualFunctionProvider;
using Composite.Core.Types;
using Composite.C1Console.Users;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.C1Console.Workflow;
using Composite.Core.Xml;
using Composite.C1Console.Events;
using Composite.Core.ResourceSystem;


namespace Composite.Plugins.Elements.ElementProviders.VisualFunctionProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditVisualFunctionWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditVisualFunctionWorkflow()
        {
            InitializeComponent();
        }



        private void CheckPageTemplatesExists(object sender, ConditionalEventArgs e)
        {
            e.Result = DataFacade.GetData<IPageTemplate>().Count() > 0;
        }



        private void CheckActiveLanguageExists(object sender, ConditionalEventArgs e)
        {
            e.Result = UserSettings.ActiveLocaleCultureInfo != null;
        }


        private void MissingActiveLanguageActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(
                DialogType.Message,
                StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", "Edit.MissingActiveLanguageTitle"),
                StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", "Edit.MissingActiveLanguageMessage"));
        }


        private void MissingPageTemplateActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(
                DialogType.Message,
                StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", "Edit.NoPageTemplatesExistsErrorTitle"),
                StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", "Edit.NoPageTemplatesExistsErrorMessage"));
        }


        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken token = (DataEntityToken)this.EntityToken;
            IVisualFunction function = (IVisualFunction)token.Data;

            this.Bindings.Add("OriginalFullName", string.Format("{0}.{1}", function.Namespace, function.Name));
            this.Bindings.Add("Function", function);
            this.Bindings.Add("XhtmlBody", function.XhtmlTemplate);

            Type interfaceType = TypeManager.GetType(function.TypeManagerName);
            DataTypeDescriptor typeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(interfaceType);

            this.Bindings.Add("EmbedableFieldsTypes", new List<Type> { interfaceType });
            this.Bindings.Add("SourceTypeFullName", interfaceType.FullName);

            this.Bindings.Add("FieldNameList", FieldNames(typeDescriptor).ToList());

            Dictionary<Guid, string> templateInfos = new Dictionary<Guid, string>();

            foreach (IPageTemplate pageTemplate in DataFacade.GetData<IPageTemplate>().ToList())
            {
                TemplatePlaceholdersInfo templatePlaceholderInfo = TemplateInfo.GetRenderingPlaceHolders(pageTemplate.Id);
                if (templatePlaceholderInfo.Placeholders.Any())
                {
                    templateInfos.Add(pageTemplate.Id, pageTemplate.Title);
                }
            }

            this.Bindings.Add("PreviewTemplateId", templateInfos.First().Key);
            this.Bindings.Add("TemplateList", templateInfos);
        }



        private IEnumerable<string> FieldNames(DataTypeDescriptor typeDescriptor)
        {
            yield return "(random)";

            foreach (DataFieldDescriptor dataField in typeDescriptor.Fields.OrderBy(f => f.Position))
            {
                yield return dataField.Name;
            }
        }


        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            XhtmlDocument templateDocument = GetTemplateDocumentFromBindings();

            IVisualFunction function = this.GetBinding<IVisualFunction>("Function");
            function.XhtmlTemplate = templateDocument.ToString();

            DataFacade.Update(function);

            string functionFullName = string.Format("{0}.{1}", function.Namespace, function.Name);
            this.UpdateBinding("OriginalFullName", functionFullName);

            updateTreeRefresher.PostRefreshMesseges(function.GetDataEntityToken());

            SetSaveStatus(true);
        }



        private XhtmlDocument GetTemplateDocumentFromBindings()
        {
            string html = this.GetBinding<string>("XhtmlBody");
            XElement xElement = XElement.Parse(html);

            return new XhtmlDocument(xElement);
        }



        private void CheckFunctionReNameIsUnique(object sender, ConditionalEventArgs e)
        {
            IVisualFunction function = this.GetBinding<IVisualFunction>("Function");

            string functionFullName = string.Format("{0}.{1}", function.Namespace, function.Name);
            string originalFullName = this.GetBinding<string>("OriginalFullName");

            if (functionFullName == originalFullName)
            {
                e.Result = true;
                return;
            }

            if (FunctionFacade.FunctionNames.Contains(functionFullName))
            {
                e.Result = false;
            }
            else
            {
                e.Result = true;
            }
        }



        private void editPreviewCodeActivity_ExecuteCode(object sender, EventArgs e)
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
                previewPage.Id = GetRootPageId();
                previewPage.Title = function.Name;

                previewPage.TemplateId = this.GetBinding<Guid>("PreviewTemplateId");
                previewPage.CultureName = UserSettings.ActiveLocaleCultureInfo.Name;

                TemplatePlaceholdersInfo templatePlaceholderInfo = TemplateInfo.GetRenderingPlaceHolders(previewPage.TemplateId);
                IPagePlaceholderContent placeHolderContent = DataFacade.BuildNew<IPagePlaceholderContent>();
                placeHolderContent.Content = string.Concat((result.Body.Elements().Select(b => b.ToString())).ToArray());
                placeHolderContent.PlaceHolderId = templatePlaceholderInfo.DefaultPlaceholderId;

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

        private static Guid GetRootPageId()
        {
            return  PageManager.GetChildrenIDs(Guid.Empty).FirstOrDefault(pageId => PageManager.GetPageById(pageId) != null);
        }

        private void previewHandleExternalEventActivity1_Invoked(object sender, System.Workflow.Activities.ExternalDataEventArgs e)
        {

        }

    }
}
