using Composite.Forms.Flows.Plugins.UiContainerFactory.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.Flows.Plugins.UiContainerFactory
{
    [CustomFactory(typeof(UiContainerFactoryCustomFactory))]
    [ConfigurationNameMapper(typeof(UiContainerFactoryDefaultNameRetriever))]
    public interface IUiContainerFactory
    {
        IUiContainer CreateContainer();
    }
}
