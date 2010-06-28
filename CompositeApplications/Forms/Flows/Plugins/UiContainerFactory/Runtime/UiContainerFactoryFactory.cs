using Composite.Configuration;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.ConfigurationSystem;


namespace Composite.Forms.Flows.Plugins.UiContainerFactory.Runtime
{
    internal sealed class UiContainerFactoryFactory : NameTypeFactoryBase<IUiContainerFactory>
    {
        public UiContainerFactoryFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
