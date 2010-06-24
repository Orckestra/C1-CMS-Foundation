using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementAttachingProvider
{
    [Assembler(typeof(NonConfigurableElementAttachingProviderAssembler))]
    public class NonConfigurableElementAttachingProvider : ElementAttachingProviderData
    {
    }

    public sealed class NonConfigurableElementAttachingProviderAssembler : IAssembler<IElementAttachingProvider, ElementAttachingProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IElementAttachingProvider Assemble(IBuilderContext context, ElementAttachingProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IElementAttachingProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
