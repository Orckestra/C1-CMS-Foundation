using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementActionProvider
{
    [Assembler(typeof(NonConfigurableElementActionProviderAssembler))]
    internal class NonConfigurableElementActionProvider : ElementActionProviderData
    {
    }

    internal sealed class NonConfigurableElementActionProviderAssembler : IAssembler<IElementActionProvider, ElementActionProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IElementActionProvider Assemble(IBuilderContext context, ElementActionProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IElementActionProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
