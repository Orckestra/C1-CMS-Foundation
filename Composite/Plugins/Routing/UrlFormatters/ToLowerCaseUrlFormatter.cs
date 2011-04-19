using Composite.Core.Routing.Plugins.UrlFormatters;
using Composite.Core.Routing.Plugins.UrlFormatters.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Routing.UrlFormatters
{
    [ConfigurationElementType(typeof(NonConfigurableUrlFormatter))]
    internal class ToLowerCaseUrlFormatter: IUrlFormatter
    {
        public string FormatUrl(string url)
        {
            return url.ToLowerInvariant();
        }
    }
}
