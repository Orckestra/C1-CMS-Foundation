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


        public void FlushTemplates()
        {
            var resources = _resourceLocker.Resources;

            foreach (var providerName in resources.ProviderNames)
            {
                var provider = PageTemplateProviderPluginFacade.GetProvider(providerName);
                if (provider != null)
                {
                    provider.FlushTemplates();
                }
            }

            resources.ResetTemplatesCache();
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
                return _resourceLocker.Resources.Templates.PageTemplates;
            }
        }

        public IPageTemplateProvider GetProviderByTemplateId(Guid pageTemplateId)
        {
            return _resourceLocker.Resources.Templates.ProviderByTemplate[pageTemplateId];
        }



        private sealed class Resources
        {
            public IEnumerable<string> ProviderNames { get; private set; }
            private volatile TemplatesCache _state;

            public TemplatesCache Templates
            {
                get { 
                    var state = _state;
                    if (state != null) return state;

                    lock(this)
                    {
                        state = _state ?? InitializePageTemplatesCache();

                        _state = state;
                    }

                    return state;
                }
            }

            public class TemplatesCache
            {
                public IEnumerable<PageTemplateDescriptor> PageTemplates { get; set; }
                public Hashtable<Guid, IPageTemplateProvider> ProviderByTemplate { get; set; }
            }

            public void ResetTemplatesCache()
            {
                _state = null;
            }

            private TemplatesCache InitializePageTemplatesCache()
            {
                var pageTemplates = new List<PageTemplateDescriptor>();
                var providerByTemplate = new Hashtable<Guid, IPageTemplateProvider>();

                foreach (string providerName in this.ProviderNames)
                {
                    var provider = PageTemplateProviderPluginFacade.GetProvider(providerName);
                    var templates = provider.GetPageTemplates().ToList();

                    pageTemplates.AddRange(templates);

                    foreach (var template in templates)
                    {
                        Verify.That(!providerByTemplate.ContainsKey(template.Id),
                                    "There are muliple layouts with the same ID: '{0}'", template.Id);

                        providerByTemplate.Add(template.Id, provider);
                    }
                }

                return new TemplatesCache { PageTemplates = pageTemplates, ProviderByTemplate = providerByTemplate };
            }

            public static void DoInitialize(Resources resources)
            {
                var providerByTemplate = new Hashtable<Guid, IPageTemplateProvider>();
                resources.ProviderNames = GetProviderNames();
            }
        }
    }
}
