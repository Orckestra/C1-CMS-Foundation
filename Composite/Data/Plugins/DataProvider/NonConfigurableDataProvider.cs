using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Data.Plugins.DataProvider
{
    [Assembler(typeof(NonConfigurableDataProviderAssembler))]
    public sealed class NonConfigurableDataProvider : DataProviderData
    {
    }

    public sealed class NonConfigurableDataProviderAssembler : IAssembler<IDataProvider, DataProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IDataProvider Assemble(IBuilderContext context, DataProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IDataProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
