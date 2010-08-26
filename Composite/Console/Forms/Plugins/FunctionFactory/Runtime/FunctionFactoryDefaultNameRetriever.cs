using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.Plugins.FunctionFactory.Runtime
{
    internal sealed class FunctionFactoryDefaultNameRetriever : IConfigurationNameMapper 
    {
        public string MapName(string name, IConfigurationSource configSource)
        {
            return null;
        }
    }
}
