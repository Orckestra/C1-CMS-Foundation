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
    public static class UrlFormattersPluginFacade
    {
        private static readonly string LogTitle = typeof(UrlFormattersPluginFacade).FullName;
        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);

        static UrlFormattersPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => _resourceLocker.ResetInitialization());
        }

        /// <exclude />
        public static string FormatUrl(string url, bool onlyMandatory)
        {
            IEnumerable<Tuple<IUrlFormatter, bool>> urlFormatters = _resourceLocker.Resources.UrlFormatters;

            foreach(var urlFormatter in urlFormatters)
            {
                if (!onlyMandatory || urlFormatter.Item2)
                {
                    url = urlFormatter.Item1.FormatUrl(url);
                }
            }

            return url;
        }

        private sealed class Resources
        {
            public IEnumerable<Tuple<IUrlFormatter, bool>> UrlFormatters { get; private set; }

            public static void Initialize(Resources resources)
            {
                const string sectionName = RoutingConfiguration.SectionName;
                var routingConfiguration = ConfigurationServices.ConfigurationSource.GetSection(sectionName) as RoutingConfiguration;
                Verify.IsNotNull(routingConfiguration, "Config section '{0}' is missing", sectionName);

                var factory = new UrlFormatterFactory();

                var formatters = new List<Tuple<IUrlFormatter, bool>>();

                var urlFormattersConfigNode = routingConfiguration.UrlFormatters;
                if (urlFormattersConfigNode != null)
                {
                    foreach (var urlFormatterData in urlFormattersConfigNode)
                    {
                        string name = urlFormatterData.Name;

                        try
                        {
                            formatters.Add(new Tuple<IUrlFormatter, bool>(factory.Create(name), urlFormatterData.Mandatory));
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
