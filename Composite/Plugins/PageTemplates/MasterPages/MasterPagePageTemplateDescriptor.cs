using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;

using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    internal class MasterPagePageTemplateDescriptor : PageTemplateDescriptor
    {
        private static readonly PermissionType[] _editWebsiteFilePermissionTypes = new[] { PermissionType.Edit };

        private static readonly ResourceHandle EditTemplateIcon = new ResourceHandle(BuildInIconProviderName.ProviderName, "page-template-edit");
        private static readonly ActionGroup PrimaryFileActionGroup = new ActionGroup("File", ActionGroupPriority.PrimaryMedium);


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
            return new[] {
            new ElementAction(new ActionHandle(new WorkflowActionToken(
                WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.EditMasterPageWorkflow"),
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
                        ActionGroup = PrimaryFileActionGroup
                    }
                }
            }};
        }
    }
}
