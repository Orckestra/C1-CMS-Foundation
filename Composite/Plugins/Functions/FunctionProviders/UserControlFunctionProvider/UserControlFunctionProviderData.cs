using System.Configuration;
using Composite.Functions.Plugins.FunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Plugins.Functions.FunctionProviders.UserControlFunctionProvider
{
    [Assembler(typeof(UserControlFunctionProviderAssembler))]
    internal class UserControlFunctionProviderData : FunctionProviderData
    {
        [ConfigurationProperty("directory", IsRequired = false, DefaultValue = "~/App_Data/UserControls")]
        public string Directory
        {
            get { return (string)base["directory"]; }
            set { base["directory"] = value; }
        }
    }
}
