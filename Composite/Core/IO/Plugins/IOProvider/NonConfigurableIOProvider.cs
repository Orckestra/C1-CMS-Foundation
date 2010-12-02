using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Core.IO.Plugins.IOProvider
{
    [Assembler(typeof(NonConfigurableIOProviderAssembler))]
    internal class NonConfigurableIOProvider : IOProviderData
    {
    }



    internal sealed class NonConfigurableIOProviderAssembler : IAssembler<IIOProvider, IOProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IIOProvider Assemble(IBuilderContext context, IOProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IIOProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
