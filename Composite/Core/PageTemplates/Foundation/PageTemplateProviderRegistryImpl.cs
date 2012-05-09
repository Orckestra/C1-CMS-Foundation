using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.PageTemplates.Plugins.Runtime;
using Composite.Core.PageTemplates.Foundation.PluginFacade;

namespace Composite.Core.PageTemplates.Foundation
{
    internal class PageTemplateProviderRegistryImpl : IPageTemplateProviderRegistry
    {
        private readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitialize);


        public void Flush()
        {
            _resourceLocker.ResetInitialization();
        }

        public IEnumerable<string> ProviderNames
        {
            get
            {
                return _resourceLocker.Resources.ProviderNames;
            }
        }

        private static IEnumerable<string> GetProviderNames()
        {
            var settings = ConfigurationServices.ConfigurationSource.GetSection(PageTemplateProviderSettings.SectionName)
                               as PageTemplateProviderSettings;

            return settings.PageTemplateProviders.Select(provider => provider.Name).ToArray();
        }


        public IEnumerable<PageTemplateDescriptor> PageTemplates
        {
            get 
            {
                return _resourceLocker.Resources.PageTemplates;
            }
        }

        public IPageTemplateProvider GetProviderByTemplateId(Guid pageTemplateId)
        {
            return _resourceLocker.Resources.ProviderByTemplate[pageTemplateId];
        }



        private sealed class Resources
        {
            public IEnumerable<string> ProviderNames { get; set; }

            public IEnumerable<PageTemplateDescriptor> PageTemplates { get; set; }
            public Hashtable<Guid, IPageTemplateProvider> ProviderByTemplate { get; set; }


            public static void DoInitialize(Resources resources)
            {
                resources.ProviderByTemplate = new Hashtable<Guid, IPageTemplateProvider>();
                resources.ProviderNames = GetProviderNames();

                var pageTemplates = new List<PageTemplateDescriptor>();

                foreach (string providerName in resources.ProviderNames)
                {
                    var provider = PageTemplateProviderPluginFacade.GetProvider(providerName);
                    var templates = provider.GetPageTemplateDescriptors();

                    pageTemplates.AddRange(templates);

                    foreach (var template in templates)
                    {
                        resources.ProviderByTemplate.Add(template.Id, provider);
                    }
                }

                resources.PageTemplates = pageTemplates;
            }
        }
    }
}
