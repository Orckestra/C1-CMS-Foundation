using Composite.Configuration;
using Composite.GlobalSettings.Plugins.GlobalSettingsProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.ConfigurationSystem;


namespace Composite.GlobalSettings.Plugins.GlobalSettingsProvider.Runtime
{
    internal sealed class GlobalSettingsProviderFactory : NameTypeFactoryBase<IGlobalSettingsProvider>
    {
        public GlobalSettingsProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
