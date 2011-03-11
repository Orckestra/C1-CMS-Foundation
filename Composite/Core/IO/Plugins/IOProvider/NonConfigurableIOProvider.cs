using System;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Core.IO.Plugins.IOProvider
{
    /// <summary>    
    /// This is a default non configurable version of <see cref="IOProviderData"/>
    /// </summary>
    [Assembler(typeof(NonConfigurableIOProviderAssembler))]
    public class NonConfigurableIOProvider : IOProviderData
    {
    }



    /// <summary>    
    /// This is a default non configurable assembler version of <see cref="IOProviderData"/>
    /// </summary>
    public sealed class NonConfigurableIOProviderAssembler : IAssembler<IIOProvider, IOProviderData>
    {
        /// <exclude />
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IIOProvider Assemble(IBuilderContext context, IOProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IIOProvider)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
