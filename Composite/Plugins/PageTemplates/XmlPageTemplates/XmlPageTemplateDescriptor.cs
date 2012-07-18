using System;
using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;
using Composite.Data;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider;

using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.PageTemplates.XmlPageTemplates
{
    internal class XmlPageTemplateDescriptor: PageTemplateDescriptor
    {
        public static ResourceHandle DeleteTemplate { get { return PageTemplateElementProvider.GetIconHandle("page-template-delete"); } }
        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        private readonly IXmlPageTemplate _xmlPageTemplate;

        public XmlPageTemplateDescriptor(IXmlPageTemplate pageTemplate)
        {
            _xmlPageTemplate = pageTemplate;
        }

        public override C1Console.Security.EntityToken GetEntityToken()
        {
            return _xmlPageTemplate.GetDataEntityToken();
        }

        public override IEnumerable<ElementAction> GetActions()
        {
            var result = new List<ElementAction>();

            Type type = WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.EditXmlPageTemplateWorkflow");

            result.Add(new ElementAction(new ActionHandle(new WorkflowActionToken(type, new[] { PermissionType.Edit })))
            {
                VisualData = new ActionVisualizedData
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
                }
            });

            type = WorkflowFacade.GetWorkflowType( "Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.DeletePageTemplateWorkflow");

            result.Add(new ElementAction(new ActionHandle(new WorkflowActionToken(type, new[] { PermissionType.Delete })))
            {
                VisualData = new ActionVisualizedData
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
            });

            return result;
        }
    }
}
