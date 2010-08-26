using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Actions.Plugins.DataActionProvider.Runtime
{
    internal sealed class DataActionProviderFactory : NameTypeFactoryBase<IDataActionProvider>
    {
        public DataActionProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
