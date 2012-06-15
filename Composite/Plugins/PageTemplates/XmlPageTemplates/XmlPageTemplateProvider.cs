using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Plugins;
using Composite.Core.WebClient.Renderings.Template;
using Composite.Data;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.PageTemplates.XmlPageTemplates
{
    [ConfigurationElementType(typeof(NonConfigurablePageTemplateProvider))]
    internal class XmlPageTemplateProvider : IPageTemplateProvider
    {
        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        public IEnumerable<PageTemplate> GetPageTemplates()
        {
            using (var conn = new DataConnection(PublicationScope.Unpublished))
            {
                var result = new List<PageTemplate>();
                
                foreach (var pageTemplate in conn.Get<IPageTemplate>())
                {
                    string defaultPlaceholderId;
                    PlaceholderDescriptor[] placeholders;

                    ParseLayoutFile(pageTemplate, out placeholders, out defaultPlaceholderId);

                    PageTemplate descriptor = new XmlPageTemplate(pageTemplate)
                    {
                        Id = pageTemplate.Id,
                        Title = pageTemplate.Title,
                        DefaultPlaceholderId = defaultPlaceholderId,
                        PlaceholderDescriptions = placeholders
                    };
                
                    result.Add(descriptor);
                }
                
                return result;
            }
        }

        private static void ParseLayoutFile(IPageTemplate pageTemplate, out PlaceholderDescriptor[] placeholders, out string defaultPlaceholder)
        {
            var placeholdersInfo = TemplateInfo.GetRenderingPlaceHolders(pageTemplate.Id);

            defaultPlaceholder = placeholdersInfo.DefaultPlaceholderId;

            placeholders = placeholdersInfo
                           .Placeholders
                           .Select(pair => new PlaceholderDescriptor { Id = pair.Key, Title = pair.Value })
                           .ToArray();
        }

        public IPageRenderer BuildPageRenderer()
        {
            return new XmlPageRenderer();
        }



        public IEnumerable<ElementAction> GetRootActions()
        {
            Type type = WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.AddNewPageTemplateWorkflow");

            return new [] { new ElementAction(new ActionHandle(new WorkflowActionToken(type, new[] { PermissionType.Add })))
            {
                VisualData = new ActionVisualizedData
                          {
                              Label = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "PageTemplateElementProvider.AddTemplate"),
                              ToolTip = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "PageTemplateElementProvider.AddTemplateToolTip"),
                              Icon = PageTemplateElementProvider.AddTemplate,
                              Disabled = false,
                              ActionLocation = new ActionLocation
                              {
                                  ActionType = ActionType.Add,
                                  IsInFolder = false,
                                  IsInToolbar = true,
                                  ActionGroup = PrimaryActionGroup
                              }
                          }
            }};
        }


        public IEnumerable<string> GetSharedFiles()
        {
            return new string[0];
        }


        public void Flush()
        {
            // Provider holds no state - no need to reinitialize anything
        }
    }
}
