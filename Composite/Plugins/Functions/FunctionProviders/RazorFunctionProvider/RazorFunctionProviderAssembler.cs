using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;
using Composite.Functions.Plugins.FunctionProvider;

namespace Composite.Plugins.Functions.FunctionProviders.RazorFunctionProvider
{
	internal class RazorFunctionProviderAssembler : IAssembler<IFunctionProvider, FunctionProviderData>
	{
		IFunctionProvider IAssembler<IFunctionProvider, FunctionProviderData>.Assemble(IBuilderContext context, FunctionProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
		{
			var data = objectConfiguration as RazorFunctionProviderData;
			if (data == null)
			{
				throw new ArgumentException("Expected configuration to be of type RazorFunctionProviderData", "objectConfiguration");
			}

			return new RazorFunctionProvider(data.Name, data.Directory);
		}
	}
}
