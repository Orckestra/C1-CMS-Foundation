using Composite.Data;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Security;
using Composite.Workflow;


namespace Composite.StandardPlugins.Elements.ElementProviders.PageElementProvider
{
    internal sealed class PageElementProviderActionTokenProvider : IActionTokenProvider
    {
        public ActionToken GetActionToken(string actionTypeName, IData data)
        {
            switch (actionTypeName)
            {
                case GenericPublishProcessControllerActionTypeNames.UndoUnpublishedChanges:
                    return new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.PageElementProvider.UndoUnpublishedChangesWorkflow"), PageElementProvider.EditPermissionTypes);

                default:
                    return null;
            }
        }
    }
}
