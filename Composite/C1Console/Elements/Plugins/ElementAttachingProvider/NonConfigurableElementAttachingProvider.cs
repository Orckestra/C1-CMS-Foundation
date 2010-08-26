using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementAttachingProvider
{
    [Assembler(typeof(NonConfigurableElementAttachingProviderAssembler))]
    internal class NonConfigurableElementAttachingProvider : ElementAttachingProviderData
    {
    }

    internal sealed class NonConfigurableElementAttachingProviderAssembler : IAssembler<IElementAttachingProvider, ElementAttachingProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IElementAttachingProvider Assemble(IBuilderContext context, ElementAttachingProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IElementAttachingProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
