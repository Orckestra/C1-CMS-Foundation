using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;
using System.ComponentModel;


namespace Composite.C1Console.Elements.Plugins.ElementProvider
{
#pragma warning disable 612

    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    [Obsolete]
    [Assembler(typeof(NonConfigurableElementProviderAssembler))]
    public class NonConfigurableElementProvider : ElementProviderData
    {
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    [Obsolete]
    public sealed class NonConfigurableElementProviderAssembler : IAssembler<IElementProvider, ElementProviderData>
    {
        /// <exclude />
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IElementProvider Assemble(IBuilderContext context, ElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IElementProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }

#pragma warning restore 612
}
