using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Routing.Plugins.UrlFormatters.Runtime
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Assembler(typeof(NonConfigurableUrlFormatterAssembler))]
    public sealed class NonConfigurableUrlFormatter : UrlFormatterData
    {
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class NonConfigurableUrlFormatterAssembler : IAssembler<IUrlFormatter, UrlFormatterData>
    {
        /// <exclude />
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IUrlFormatter Assemble(IBuilderContext context, UrlFormatterData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IUrlFormatter)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
