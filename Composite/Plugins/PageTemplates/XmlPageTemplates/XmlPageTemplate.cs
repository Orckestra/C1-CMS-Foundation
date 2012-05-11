using System;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;
using Composite.Data;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider;

using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.PageTemplates.XmlPageTemplates
{
    internal class XmlPageTemplate: PageTemplateDescriptor
    {
        public static ResourceHandle DeleteTemplate { get { return PageTemplateElementProvider.GetIconHandle("page-template-delete"); } }
        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        private IPageTemplate _pageTemplate;

        public XmlPageTemplate(IPageTemplate pageTemplate)
        {
            _pageTemplate = pageTemplate;
        }

        public override C1Console.Security.EntityToken GetEntityToken()
        {
            return _pageTemplate.GetDataEntityToken();
        }

        public override void AppendActions(C1Console.Elements.Element element)
        {
            element.AddWorkflowAction(
                       "Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.EditPageTemplateWorkflow",
                        new [] { PermissionType.Edit },
                new ActionVisualizedData
                {
                    Label = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "PageTemplateElementProvider.EditTemplate"),
                    ToolTip = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "PageTemplateElementProvider.EditTemplateToolTip"),
                    Icon = PageTemplateElementProvider.EditTemplate,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Edit,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                });


            element.AddWorkflowAction(
                "Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.DeletePageTemplateWorkflow", 
                new[] { PermissionType.Delete },
                new ActionVisualizedData
                {
                    Label = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "PageTemplateElementProvider.DeleteTemplate"),
                    ToolTip = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "PageTemplateElementProvider.DeleteTemplateToolTip"),
                    Icon = DeleteTemplate,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Delete,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            );
        }
    }
}
