using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.Plugins.UiControlFactory.Runtime
{
    internal sealed class UiControlFactoryFactory : NameTypeFactoryBase<IUiControlFactory>
    {
        public UiControlFactoryFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }
    }
}
