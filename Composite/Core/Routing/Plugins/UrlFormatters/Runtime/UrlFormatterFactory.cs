using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Core.Routing.Plugins.UrlFormatters.Runtime
{
    internal sealed class UrlFormatterFactory : NameTypeFactoryBase<IUrlFormatter>
    {
        public UrlFormatterFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}