using Composite.C1Console.Actions;
using Composite.C1Console.Actions.Data;
using Composite.C1Console.Events;
using Composite.C1Console.Workflow;
using Composite.Core.Application;
using Composite.Data;
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
            DataActionTokenResolverFacade.RegisterDefault<IPage>(ActionIdentifier.Add, new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageElementProvider.AddNewPageWorkflow")) { DoIgnoreEntityTokenLocking = true });
            DataActionTokenResolverFacade.RegisterDefault<IPage>(ActionIdentifier.Edit, new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageElementProvider.EditPageWorkflow")));
            DataActionTokenResolverFacade.RegisterDefault<IPage>(ActionIdentifier.Delete, new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageElementProvider.DeletePageWorkflow")));
        }

        /// <exclude />
        public static void OnInitialized()
        {

        }
    }
}