using Composite.Core.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.C1Console.Forms.Plugins.FunctionFactory
{
    [ConfigurationElementType(typeof(NonConfigurableFunctionFactory))]
    internal class FunctionFactoryData : NameTypeManagerTypeConfigurationElement
    {
    }
}
