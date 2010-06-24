using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Actions.Plugins.DataActionProvider
{
    [Assembler(typeof(NonConfigurableDataActionProviderAssembler))]
    public class NonConfigurableDataActionProvider : DataActionProviderData
    {
    }

    public sealed class NonConfigurableDataActionProviderAssembler : IAssembler<IDataActionProvider, DataActionProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IDataActionProvider Assemble(IBuilderContext context, DataActionProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IDataActionProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
