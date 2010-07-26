using Composite.Configuration;
using Composite.ConfigurationSystem;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.Plugins.UiControlFactory.Runtime
{
    internal sealed class UiControlFactoryFactory : NameTypeFactoryBase<IUiControlFactory>
    {
        public UiControlFactoryFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
