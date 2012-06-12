using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;

using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.PageTemplates.Razor
{
    internal class RazorPageTemplate: PageTemplate
    {
        private static readonly PermissionType[] _editWebsiteFilePermissionTypes = new [] { PermissionType.Edit };

        private static readonly ResourceHandle EditTemplateIcon = new ResourceHandle(BuildInIconProviderName.ProviderName, "page-template-edit");
        private static readonly ActionGroup PrimaryFileActionGroup = new ActionGroup("File", ActionGroupPriority.PrimaryMedium);

        private readonly string _filePath;

        public RazorPageTemplate(string filePath)
        {
            _filePath = filePath;
        }

        public string FilePath { get { return _filePath; } }

        public override IEnumerable<ElementAction> GetActions()
        {
            
            return new [] {
            new ElementAction(new ActionHandle(new WorkflowActionToken(
                WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.EditRazorPageTemplateWorkflow"),
                _editWebsiteFilePermissionTypes)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "EditRazorTemplateAction.Label"),
                    ToolTip = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "EditRazorTemplateAction.ToolTip"),
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
    }
}
