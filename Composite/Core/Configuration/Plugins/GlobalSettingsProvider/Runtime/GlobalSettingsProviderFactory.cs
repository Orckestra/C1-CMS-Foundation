using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Configuration.Plugins.GlobalSettingsProvider.Runtime
{
    internal sealed class GlobalSettingsProviderFactory : NameTypeFactoryBase<IGlobalSettingsProvider>
    {
        public GlobalSettingsProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
