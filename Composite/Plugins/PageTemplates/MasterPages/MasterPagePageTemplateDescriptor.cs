using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider;
using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    internal class MasterPagePageTemplateDescriptor : PageTemplateDescriptor
    {
        private static readonly PermissionType[] _editWebsiteFilePermissionTypes = new[] { PermissionType.Edit };

        private static readonly ResourceHandle EditTemplateIcon = new ResourceHandle(BuildInIconProviderName.ProviderName, "page-template-edit");
        public static ResourceHandle DeleteTemplateIcon { get { return PageTemplateElementProvider.GetIconHandle("page-template-delete"); } }
        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);


        private readonly string _filePath;
        private readonly string _codeBehindFilePath;

        public MasterPagePageTemplateDescriptor(string filePath, string codeBehindFilePath)
        {
            Verify.ArgumentNotNull(filePath, "filePath");

            _filePath = filePath;
            _codeBehindFilePath = codeBehindFilePath;
        }

        public string FilePath { get { return _filePath; } }

        public string CodeBehindFilePath { get { return _codeBehindFilePath; } }

        public string[] GetFiles()
        {
            var result = new List<string>();
            result.Add(FilePath);

            if(CodeBehindFilePath != null)
            {
                result.Add(CodeBehindFilePath);
            }

            return result.ToArray();
        }

        public override IEnumerable<C1Console.Elements.ElementAction> GetActions()
        {
            var result = new List<ElementAction>();

            Type workflowType = WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.EditMasterPageWorkflow");

            result.Add(new ElementAction(new ActionHandle(new WorkflowActionToken(
                workflowType,
                _editWebsiteFilePermissionTypes)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "EditMasterPageAction.Label"),
                    ToolTip = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "EditMasterPageAction.ToolTip"),
                    Icon = EditTemplateIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Edit,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            });

            workflowType = WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.DeletePageTemplateWorkflow");

            result.Add(new ElementAction(new ActionHandle(new WorkflowActionToken(workflowType, new[] { PermissionType.Delete })))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "PageTemplateElementProvider.DeleteTemplate"),
                    ToolTip = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "PageTemplateElementProvider.DeleteTemplateToolTip"),
                    Icon = DeleteTemplateIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Delete,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            });

            return result;
        }
    }
}
