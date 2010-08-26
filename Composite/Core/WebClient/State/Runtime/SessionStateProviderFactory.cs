using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Core.WebClient.State.Runtime
{
    internal class SessionStateProviderFactory : NameTypeFactoryBase<ISessionStateProvider>
    {
        public SessionStateProviderFactory() 
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
