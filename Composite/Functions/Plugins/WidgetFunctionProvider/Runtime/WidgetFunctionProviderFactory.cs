using Composite.Configuration;
using Composite.ConfigurationSystem;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Functions.Plugins.WidgetFunctionProvider.Runtime
{
    internal sealed class WidgetFunctionProviderFactory : NameTypeFactoryBase<IWidgetFunctionProvider>
    {
        public WidgetFunctionProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
