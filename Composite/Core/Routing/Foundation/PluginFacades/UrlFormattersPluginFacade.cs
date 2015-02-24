using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Routing.Plugins.Runtime;
using Composite.Core.Routing.Plugins.UrlFormatters;
using Composite.Core.Routing.Plugins.UrlFormatters.Runtime;
using Composite.Data.Types;
using Composite.Data.Validation;
using Composite.Data.Validation.ClientValidationRules;

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

            url = FilterInvalidCharacters(url);

            return url;
        }

        private static string FilterInvalidCharacters(string pageTitle)
        {
            var regexClientValidationRule = 
                ClientValidationRuleFacade.GetClientValidationRules(typeof(IPage), "UrlTitle")
                                          .OfType<RegexClientValidationRule>().Single();

            var generated = new StringBuilder();
            var regex = new Regex(regexClientValidationRule.Expression);

            foreach (char c in pageTitle)
            {
                var matchString = new string(c, 1);
                if (regex.IsMatch(matchString))
                {
                    generated.Append(c);
                }
            }

            return generated.ToString();
        }

        private sealed class Resources
        {
            public IEnumerable<Tuple<IUrlFormatter, bool>> UrlFormatters { get; private set; }

            public static void Initialize(Resources resources)
            {
                const string sectionName = UrlsConfiguration.SectionName;
                var routingConfiguration = ConfigurationServices.ConfigurationSource.GetSection(sectionName) as UrlsConfiguration;
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
