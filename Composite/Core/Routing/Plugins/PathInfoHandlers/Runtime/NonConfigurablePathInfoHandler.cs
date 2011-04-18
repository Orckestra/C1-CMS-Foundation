using System;

using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.Routing.Plugins.PathInfoHandlers.Runtime
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [Assembler(typeof(NonConfigurablePathInfoHandlerAssembler))]
    public sealed class NonConfigurablePathInfoHandler : PathInfoHandlerData
    {
    }

    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class NonConfigurablePathInfoHandlerAssembler : IAssembler<IPathInfoHandler, PathInfoHandlerData>
    {
        /// <exclude />
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IPathInfoHandler Assemble(IBuilderContext context, PathInfoHandlerData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IPathInfoHandler)Activator.CreateInstance(objectConfiguration.Type);
        }
    }
}
