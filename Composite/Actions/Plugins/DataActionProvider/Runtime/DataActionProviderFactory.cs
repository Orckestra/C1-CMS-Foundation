using Composite.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.ConfigurationSystem;


namespace Composite.Actions.Plugins.DataActionProvider.Runtime
{
    internal sealed class DataActionProviderFactory : NameTypeFactoryBase<IDataActionProvider>
    {
        public DataActionProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
