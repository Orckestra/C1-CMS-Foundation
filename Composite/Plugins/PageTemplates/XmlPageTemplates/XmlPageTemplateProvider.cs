using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Elements;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Plugins;
using Composite.Core.WebClient.Renderings.Template;
using Composite.Data;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.PageTemplates.XmlPageTemplates
{
    [ConfigurationElementType(typeof(NonConfigurablePageTemplateProvider))]
    internal class XmlPageTemplateProvider : IPageTemplateProvider
    {
        public IEnumerable<PageTemplateDescriptor> GetPageTemplates()
        {
            using (var conn = new DataConnection(PublicationScope.Published))
            {
                var result = new List<PageTemplateDescriptor>();
                
                foreach (var xmlPageTemplate in conn.Get<IXmlPageTemplate>())
                {
                    string defaultPlaceholderId;
                    PlaceholderDescriptor[] placeholders;

                    ParseLayoutFile(xmlPageTemplate, out placeholders, out defaultPlaceholderId);

                    PageTemplateDescriptor descriptor = new XmlPageTemplateDescriptor(xmlPageTemplate)
                    {
                        Id = xmlPageTemplate.Id,
                        Title = xmlPageTemplate.Title,
                        DefaultPlaceholderId = defaultPlaceholderId,
                        PlaceholderDescriptions = placeholders
                    };
                
                    result.Add(descriptor);
                }
                
                return result;
            }
        }


        private static void ParseLayoutFile(IXmlPageTemplate pageTemplate, out PlaceholderDescriptor[] placeholders, out string defaultPlaceholder)
        {
            var placeholdersInfo = TemplateInfo.GetRenderingPlaceHolders(pageTemplate.Id);

            defaultPlaceholder = placeholdersInfo.DefaultPlaceholderId;

            placeholders = placeholdersInfo
                           .Placeholders
                           .Select(pair => new PlaceholderDescriptor { Id = pair.Key, Title = pair.Value })
                           .ToArray();
        }

        public IPageRenderer BuildPageRenderer(Guid templateId)
        {
            return new XmlPageRenderer();
        }



        public IEnumerable<ElementAction> GetRootActions()
        {
            return new ElementAction[0];
        }

        public void FlushTemplates()
        {
            // Provider holds no state - no need to reinitialize anything
        }
    }
}
