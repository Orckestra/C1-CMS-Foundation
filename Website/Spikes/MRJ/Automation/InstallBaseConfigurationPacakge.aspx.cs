using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Composite.Workflow;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Security;
using Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider;
using Composite.Workflow.Foundation;
using Composite.Forms.CoreUiControls;
using System.IO;
using Composite.Forms.Flows;




namespace Composite.Spikes.MRJ
{
    public sealed class DummyManagementConsoleMessageService : IManagementConsoleMessageService
    {
        public void CloseCurrentView()
        {
        }

        public void RefreshTreeSection(EntityToken entityToken)
        {
        }

        public void ShowMessage(DialogType dislogType, string title, string message)
        {
        }

        public void ShowGlobalMessage(DialogType dialogType, string title, string message)
        {
        }

        public void ShowLogEntry(Type sender, Exception exception)
        {
        }

        public void ShowLogEntry(Type sender, Logging.LogLevel logLevel, string message)
        {
        }

        public bool HasView
        {
            get { return true; }
        }

        public bool CloseCurrentViewRequested
        {
            get { return true; }
        }

        public string CurrentConsoleId
        {
            get { return "Dummy"; }
        }

        public void RebootConsole()
        {            
        }

        public void CollapseAndRefresh()
        {            
        }

        public void LockSystem()
        {            
        }

        public void BroadcastMessage(string name, string value)
        {            
        }

        public void SaveStatus(bool succeeded)
        {            
        }

        public void BindEntityTokenToView(string entityToken)
        {            
        }
    }

    
    
  /*  public sealed class DummyFormFlowRenderingService : IFormFlowRenderingService
    {
        public void RerenderView()
        {            
        }

        public bool RerenderViewRequested
        {
            get { return false; }
        }

        public bool HasFieldMessages
        {
            get { return false; }
        }

        public void ShowFieldMessage(string fieldBindingPath, string message)
        {            
        }

        public void SetSaveStatus(bool succeeded)
        {            
        }
    }*/



    public partial class InstallBaseConfigurationPacakge : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           /* WorkflowActionExecutor workflowActionExecutor = new WorkflowActionExecutor();

            FlowControllerServicesContainer flowControllerServicesContainer = new FlowControllerServicesContainer();
            flowControllerServicesContainer.AddService(new DummyManagementConsoleMessageService());
            flowControllerServicesContainer.AddService(new DummyFormFlowRenderingService());
            
            
            
            WorkflowFlowToken flowToken = (WorkflowFlowToken)workflowActionExecutor.Execute(
                new PackageElementProviderInstalledPackageLocalPackagesFolderEntityToken(),
                new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.PackageElementProvider.InstallLocalPackageWorkflow")),
                flowControllerServicesContainer
            );

            FlowControllerFacade.GetCurrentUiDefinition(flowToken, flowControllerServicesContainer);

            FormData formData = WorkflowFacade.GetFormData(flowToken.WorkflowInstanceId);
            UploadedFile uploadedFile = (UploadedFile)formData.Bindings["UploadedFile"];
            uploadedFile.FileStream = new FileStream(@"d:\BaseConfiguration.zip", FileMode.Open);

            WorkflowFacade.FireNextEvent(flowToken.WorkflowInstanceId, formData.Bindings);
            
            WorkflowFacade.FireNextEvent(flowToken.WorkflowInstanceId, formData.Bindings);

            WorkflowFacade.FireFinishEvent(flowToken.WorkflowInstanceId, formData.Bindings);
            

            FlowControllerFacade.CancelFlow(flowToken);*/
        }
    }
}