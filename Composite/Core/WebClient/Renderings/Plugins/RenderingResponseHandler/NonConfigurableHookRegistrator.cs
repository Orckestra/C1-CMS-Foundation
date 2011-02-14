using System;
using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Assembler(typeof(NonConfigurableRenderingResponseHandlerAssembler))]
    public sealed class NonConfigurableRenderingResponseHandler : RenderingResponseHandlerData
    {
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class NonConfigurableRenderingResponseHandlerAssembler : IAssembler<IRenderingResponseHandler, RenderingResponseHandlerData>
	{
        /// <exclude />
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IRenderingResponseHandler Assemble(IBuilderContext context, RenderingResponseHandlerData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IRenderingResponseHandler)Activator.CreateInstance(objectConfiguration.Type);
        }
	}
}
