using Composite.Forms.Plugins.UiControlFactory.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Forms.Plugins.UiControlFactory
{
    [CustomFactory(typeof(UiControlFactoryCustomFactory))]
    [ConfigurationNameMapper(typeof(UiControlFactoryDefaultNameRetriever))]
    public interface IUiControlFactory
    {
        IUiControl CreateControl();
    }
}
