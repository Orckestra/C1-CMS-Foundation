using Composite.C1Console.Actions;
using Composite.C1Console.Actions.Data;
using Composite.C1Console.Workflow;
using Composite.Core.Application;
using Composite.Core.Serialization;
using Composite.Data.Types;

namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    /// <summary>
    /// Here we register default actions for page element providers
    /// </summary>
    [ApplicationStartup]
    public static class PageElementDynamicActionTokens
    {
        /// <exclude />
        public static void OnBeforeInitialize()
        {
        }

        /// <exclude />
        public static void OnInitialized(DataActionTokenResolver resolver)
        {
            resolver.RegisterDefault<IPage>(ActionIdentifier.Add, f => new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageElementProvider.AddNewPageWorkflow")) { DoIgnoreEntityTokenLocking = true, Payload = SerializerHandlerFacade.Serialize(f) });
            resolver.RegisterDefault<IPage>(ActionIdentifier.Edit, f => new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageElementProvider.EditPageWorkflow")));
            resolver.RegisterDefault<IPage>(ActionIdentifier.Delete, f => new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageElementProvider.DeletePageWorkflow")));
            resolver.RegisterDefault<IPage>(ActionIdentifier.Duplicate, f => new DuplicateActionToken());
        }
    }
}