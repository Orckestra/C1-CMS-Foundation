using Composite.Functions.Plugins.FunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;

namespace Composite.Plugins.Functions.FunctionProviders.UserControlFunctionProvider
{
    internal class UserControlFunctionProviderAssembler : IAssembler<IFunctionProvider, FunctionProviderData>
    {
        IFunctionProvider IAssembler<IFunctionProvider, FunctionProviderData>.Assemble(IBuilderContext context, FunctionProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            var data = objectConfiguration as UserControlFunctionProviderData;
            Verify.ArgumentCondition(data != null, "objectConfiguration", "Expected configuration to be of type " + typeof(UserControlFunctionProviderData).Name);

            return new UserControlFunctionProvider(data.Name, data.Directory);
        }
    }
}
