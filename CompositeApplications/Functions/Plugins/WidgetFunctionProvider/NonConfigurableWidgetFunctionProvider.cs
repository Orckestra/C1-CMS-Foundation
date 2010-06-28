using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Functions.Plugins.WidgetFunctionProvider
{
    [Assembler(typeof(NonConfigurableWidgetFunctionProviderAssembler))]
    internal sealed class NonConfigurableWidgetFunctionProvider : WidgetFunctionProviderData
    {
    }

    internal sealed class NonConfigurableWidgetFunctionProviderAssembler : IAssembler<IWidgetFunctionProvider, WidgetFunctionProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IWidgetFunctionProvider Assemble(IBuilderContext context, WidgetFunctionProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IWidgetFunctionProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
