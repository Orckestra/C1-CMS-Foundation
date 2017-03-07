using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementActionProvider;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Trees
{
    [ConfigurationElementType(typeof(NonConfigurableElementActionProvider))]
    internal sealed class TreeElementActionProvider : IElementActionProvider
    {
        private static readonly ResourceHandle AddApplicationIcon = ResourceHandle.BuildIconFromDefaultProvider("tree-add-application");
        private static readonly ResourceHandle RemoveApplicationIcon = ResourceHandle.BuildIconFromDefaultProvider("tree-remove-application");

        private static readonly ActionGroup ApplicationsActionGroup = new ActionGroup("Applications", ActionGroupPriority.TargetedAppendMedium);

        private static readonly List<PermissionType> AddPermissionTypes = new List<PermissionType> { PermissionType.Administrate, PermissionType.Configure };
        private static readonly List<PermissionType> RemovePermissionTypes = new List<PermissionType> { PermissionType.Administrate, PermissionType.Configure };


        public IEnumerable<ElementAction> GetActions(EntityToken entityToken)
        {
            if (TreeFacade.HasPossibleAttachmentPoints(entityToken))
            {
                yield return new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Trees.Workflows.AddApplicationWorkflow"), AddPermissionTypes) { DoIgnoreEntityTokenLocking = true }))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "AddApplicationWorkflow.AddApplication.Label"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "AddApplicationWorkflow.AddApplication.ToolTip"),
                        Icon = AddApplicationIcon,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Other,
                            IsInFolder = false,
                            IsInToolbar = false,
                            ActionGroup = ApplicationsActionGroup
                        }
                    }
                };


                yield return new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Trees.Workflows.RemoveApplicationWorkflow"), RemovePermissionTypes) { DoIgnoreEntityTokenLocking = true }))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "RemoveApplicationWorkflow.RemoveApplication.Label"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "RemoveApplicationWorkflow.RemoveApplication.ToolTip"),
                        Icon = RemoveApplicationIcon,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Other,
                            IsInFolder = false,
                            IsInToolbar = false,
                            ActionGroup = ApplicationsActionGroup
                        }
                    }
                };
            }


            List<ElementAction> elementActions = new List<ElementAction>();
            foreach (Tree tree in TreeFacade.GetTreesByEntityToken(entityToken))
            {
                TreeNodeDynamicContext dynamicContext = new TreeNodeDynamicContext(TreeNodeDynamicContextDirection.Down)
                {
                    CurrentTreeNode = tree.RootTreeNode,
                    CurrentEntityToken = entityToken,
                    Piggybag = new Dictionary<string, string>()
                };

                foreach (ActionNode actionNode in tree.RootTreeNode.ActionNodes)
                {
                    actionNode.AddAction(f => elementActions.Add(f), entityToken, dynamicContext);
                }
            }


            foreach (ElementAction elementAction in elementActions)
            {
                yield return elementAction;
            }
        }
    }
}
