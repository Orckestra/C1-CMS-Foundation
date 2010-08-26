using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Core.Instrumentation.Plugin
{
    [Assembler(typeof(NonConfigurablePerformanceCounterProviderAssembler))]
    internal class NonConfigurablePerformanceCounterProvider : PerformanceCounterProviderData
    {
    }

    internal sealed class NonConfigurablePerformanceCounterProviderAssembler : IAssembler<IPerformanceCounterProvider, PerformanceCounterProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IPerformanceCounterProvider Assemble(IBuilderContext context, PerformanceCounterProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IPerformanceCounterProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
