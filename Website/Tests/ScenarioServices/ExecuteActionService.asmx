<%@ WebService Language="C#" Class="ExecuteActionService" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;

using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.C1Console.Events;
using Composite.C1Console.Elements;
using Composite.C1Console.Workflow;
using Composite.C1Console.Workflow.Foundation;
using Composite.C1Console.Tasks;

[WebService(Namespace = "http://www.composite.net/ns/test")]
[SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
public class ExecuteActionService  : WebService 
{
    private string _viewId = "TestViewId";
    private string _consoleId = "TestConsoleId";
    
    [WebMethod]
    public string ExecuteAction(string providerName, string serializedEntityToken, string serializedActionToken)
    {
        serializedEntityToken = @"entityTokenType='Composite\.Plugins\.Elements\.ElementProviders\.PageElementProvider\.PageElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\'\'_EntityToken_Source_=\'PageElementProvider\'_EntityToken_Id_=\'\''entityTokenHash='1610858203'";
        serializedActionToken = @"actionTokenType='Composite\.Workflow\.WorkflowActionToken,Composite'actionToken='_WorkflowType_=\'Composite\\\.Plugins\\\.Elements\\\.ElementProviders\\\.PageElementProvider\\\.AddNewPageWorkflow,Composite\\\.Workflows\'_Payload_=\'\'_ExtraPayload_=\'\'_Ignore_=\'True\'_PermissionTypes_=\'Add\''actionTokenHash='1930371641'";
        
        UserValidationFacade.FormValidateUser("admin", "123456");
        
        
        EntityToken entityToken = EntityTokenSerializer.Deserialize(serializedEntityToken);
        ActionToken actionToken = ActionTokenSerializer.Deserialize(serializedActionToken);
        
        FlowControllerServicesContainer flowControllerServiceContainer = new FlowControllerServicesContainer();
        flowControllerServiceContainer.AddService(new ManagementConsoleMessageService(_consoleId, _viewId));
        flowControllerServiceContainer.AddService(new ElementDataExchangeService(providerName));
        flowControllerServiceContainer.AddService(new Composite.Core.WebClient.FlowMediators.ActionExecutionService(providerName, _consoleId));

        FlowToken flowToken = ActionExecutorFacade.Execute(entityToken, actionToken, flowControllerServiceContainer);
        string serializedFlowToken = FlowTokenSerializer.Serialize(flowToken);

        IFlowUiDefinition flowUiDefinition = FlowControllerFacade.GetCurrentUiDefinition(flowToken, flowControllerServiceContainer);
        
        // in flowUiDefinition we can find bindings and which events are possible (next, finish, etc).
        
        return serializedFlowToken;
    }

    

    [WebMethod]
    public void FireFinish(string serializedFlowToken, string providerName)
    {
        WorkflowFlowToken workflowFlowToken = (WorkflowFlowToken)FlowTokenSerializer.Deserialize(serializedFlowToken);
        
        UserValidationFacade.FormValidateUser("admin", "123456");
        
        
        FlowControllerServicesContainer flowControllerServiceContainer = new FlowControllerServicesContainer();
        flowControllerServiceContainer.AddService(new ManagementConsoleMessageService(_consoleId, _viewId));
        flowControllerServiceContainer.AddService(new ElementDataExchangeService(providerName));
        flowControllerServiceContainer.AddService(new Composite.Core.WebClient.FlowMediators.ActionExecutionService(providerName, _consoleId));

        FormData formData = WorkflowFacade.GetFormData(workflowFlowToken.WorkflowInstanceId);
        
        using (TaskContainer taskContainer = TaskManagerFacade.RuntTasks(workflowFlowToken, new WorkflowTaskManagerEvent(workflowFlowToken, workflowFlowToken.WorkflowInstanceId)))
        {
            TaskManagerFlowControllerService taskManagerFlowControllerService = new TaskManagerFlowControllerService(taskContainer);
            flowControllerServiceContainer.AddService(taskManagerFlowControllerService);

            WorkflowFacade.FireFinishEvent(workflowFlowToken.WorkflowInstanceId, formData.Bindings);
            WorkflowFacade.SetFlowControllerServicesContainer(workflowFlowToken.WorkflowInstanceId, flowControllerServiceContainer);
            WorkflowFacade.RunWorkflow(workflowFlowToken.WorkflowInstanceId);

            flowControllerServiceContainer.RemoveService(taskManagerFlowControllerService);
        }
    }
}
