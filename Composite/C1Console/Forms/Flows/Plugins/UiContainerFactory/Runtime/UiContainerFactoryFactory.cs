using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.Flows.Plugins.UiContainerFactory.Runtime
{
    internal sealed class UiContainerFactoryFactory : NameTypeFactoryBase<IUiContainerFactory>
    {
        public UiContainerFactoryFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
