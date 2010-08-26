using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Core.ResourceSystem.Plugins.ResourceProvider
{
    [Assembler(typeof(NonConfigurableResourceProviderAssembler))]
    internal class NonConfigurableResourceProvider : ResourceProviderData
    {
    }


    internal sealed class NonConfigurableResourceProviderAssembler : IAssembler<IResourceProvider, ResourceProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IResourceProvider Assemble(IBuilderContext context, ResourceProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IResourceProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
