using System;
using System.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Routing.Plugins.Runtime;
using Composite.Core.Routing.Plugins.UrlFormatters;
using Composite.Core.Routing.Plugins.UrlFormatters.Runtime;

namespace Composite.Core.Routing.Foundation.PluginFacades
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class UrlFormatterPluginFacade
    {
        private static readonly string LogTitle = typeof(UrlFormatterPluginFacade).FullName;
        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);

        static UrlFormatterPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => _resourceLocker.ResetInitialization());
        }

        public static string FormatUrl(string url)
        {
            IEnumerable<IUrlFormatter> urlFormatters = _resourceLocker.Resources.UrlFormatters;
            foreach(var urlFormatter in urlFormatters)
            {
                url = urlFormatter.FormatUrl(url);
            }

            return url;
        }

        private sealed class Resources
        {
            public IEnumerable<IUrlFormatter> UrlFormatters { get; private set; }

            public static void Initialize(Resources resources)
            {
                const string sectionName = RoutingConfiguration.SectionName;
                var routingConfiguration = ConfigurationServices.ConfigurationSource.GetSection(sectionName) as RoutingConfiguration;
                Verify.IsNotNull(routingConfiguration, "Config section '{0}' is missing", sectionName);

                var factory = new UrlFormatterFactory();

                var formatters = new List<IUrlFormatter>();

                var urlFormattersConfigNode = routingConfiguration.UrlFormatters;
                if (urlFormattersConfigNode != null)
                {
                    foreach (var urlFormatterData in urlFormattersConfigNode)
                    {
                        string name = urlFormatterData.Name;

                        try
                        {
                            formatters.Add(factory.Create(name));
                        }
                        catch(Exception ex)
                        {
                            Log.LogError(LogTitle, "Failed to load url formatter '{0}'", name);
                            Log.LogError(LogTitle, ex);
                        }
                    }
                }

                resources.UrlFormatters = formatters;
            }
        }
    }
}
