using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementProvider
{
#pragma warning disable 612

    [Obsolete]
    [Assembler(typeof(NonConfigurableElementProviderAssembler))]
    internal class NonConfigurableElementProvider : ElementProviderData
    {
    }

    [Obsolete]
    internal sealed class NonConfigurableElementProviderAssembler : IAssembler<IElementProvider, ElementProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IElementProvider Assemble(IBuilderContext context, ElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IElementProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }

#pragma warning restore 612
}
