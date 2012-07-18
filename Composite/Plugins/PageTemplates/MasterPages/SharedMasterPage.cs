using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    internal class SharedMasterPage: SharedFile
    {
        private static readonly PermissionType[] _editWebsiteFilePermissionTypes = new[] { PermissionType.Edit };

        private static readonly ResourceHandle EditTemplateIcon = new ResourceHandle(BuildInIconProviderName.ProviderName, "page-template-edit");
        private static readonly ActionGroup PrimaryFileActionGroup = new ActionGroup("File", ActionGroupPriority.PrimaryMedium);


        public SharedMasterPage(string virtualFilePath)
            : base(virtualFilePath)
        {
            this.DefaultEditAction = false;
        }

        public override IEnumerable<C1Console.Elements.ElementAction> GetActions()
        {
            return new[] {
            new ElementAction(new ActionHandle(new WorkflowActionToken(
                WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.EditMasterPageWorkflow"),
                _editWebsiteFilePermissionTypes)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = GetText("EditMasterPageAction.Label"),
                    ToolTip = GetText("EditMasterPageAction.ToolTip"),
                    Icon = EditTemplateIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Edit,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryFileActionGroup
                    }
                }
            }};
        }

        private static string GetText(string stringId)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.MasterPagePageTemplate", stringId);
        }
    }
}
