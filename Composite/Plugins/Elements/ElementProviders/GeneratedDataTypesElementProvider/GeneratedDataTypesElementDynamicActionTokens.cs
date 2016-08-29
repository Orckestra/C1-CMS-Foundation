using Composite.C1Console.Actions;
using Composite.C1Console.Actions.Data;
using Composite.C1Console.Workflow;
using Composite.Core.Application;
using Composite.Data;

namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    /// <summary>
    /// Here we register default actions for generated data type elements
    /// </summary>
    [ApplicationStartup]
    public static class GeneratedDataTypesElementDynamicActionTokens
    {
        /// <exclude />
        public static void OnBeforeInitialize()
        {
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.Edit, f => new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.EditDataWorkflow")));
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.Delete, f => new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider.DeleteDataWorkflow")));
            DataActionTokenResolverFacade.RegisterDefault<IData>(ActionIdentifier.Duplicate, f => new DuplicateActionToken());
        }
        /// <exclude />
        public static void OnInitialized()
        {

        }
    }
}
