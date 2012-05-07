using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Plugins;
using Composite.Core.PageTemplates.Plugins.Runtime;
using Composite.Core.WebClient.Renderings.Template;
using Composite.Data;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Plugins.PageTemplates.XmlPageTemplates
{
    [ConfigurationElementType(typeof(NonConfigurablePageTemplateProvider))]
    internal class XmlPageTemplateProvider: IPageTemplateProvider
    {
        public IEnumerable<PageTemplateDescriptor> GetPageTemplateDescriptors()
        {
            using (var conn = new DataConnection(PublicationScope.Unpublished))
            {
                var result = new List<PageTemplateDescriptor>();
                
                foreach (var pageTemplate in conn.Get<IPageTemplate>())
                {
                    string defaultPlaceholderId;
                    PlaceholderDescriptor[] placeholders;

                    ParseLayoutFile(pageTemplate, out placeholders, out defaultPlaceholderId);

                    PageTemplateDescriptor descriptor = new PageTemplateDescriptor
                    {
                        Id = pageTemplate.Id,
                        Title = pageTemplate.Title,
                        DefaultPlaceholderId = defaultPlaceholderId,
                        PlaceholderDescriptions = placeholders
                    };
                
                    result.Add(descriptor);
                }
                
                return result as IEnumerable<PageTemplateDescriptor>;
            
                // return null;
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
    }
}
