using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.WebClient.State.Runtime
{
    internal class SessionStateProviderFactory : NameTypeFactoryBase<ISessionStateProvider>
    {
        public SessionStateProviderFactory() 
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
