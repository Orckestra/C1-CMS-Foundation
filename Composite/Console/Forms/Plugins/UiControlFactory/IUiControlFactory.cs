using Composite.C1Console.Forms.Plugins.UiControlFactory.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.Plugins.UiControlFactory
{
    [CustomFactory(typeof(UiControlFactoryCustomFactory))]
    [ConfigurationNameMapper(typeof(UiControlFactoryDefaultNameRetriever))]
    internal interface IUiControlFactory
    {
        IUiControl CreateControl();
    }
}
