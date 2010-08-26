using Composite.C1Console.Forms.Flows.Plugins.UiContainerFactory.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.Flows.Plugins.UiContainerFactory
{
    [CustomFactory(typeof(UiContainerFactoryCustomFactory))]
    [ConfigurationNameMapper(typeof(UiContainerFactoryDefaultNameRetriever))]
    internal interface IUiContainerFactory
    {
        IUiContainer CreateContainer();
    }
}
