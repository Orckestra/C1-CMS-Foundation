using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.IO.Plugins.IOProvider.Runtime
{
    internal sealed class IOProviderFactory: NameTypeFactoryBase<IIOProvider>
	{
        public IOProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
	}
}
