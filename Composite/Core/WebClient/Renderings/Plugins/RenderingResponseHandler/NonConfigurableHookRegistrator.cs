using System;
using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.WebClient.Renderings.Plugins.RenderingResponseHandler
{
    /// <summary>
    /// Configuration object with no custom config settings. When developing your own <see cref="IRenderingResponseHandler"/> 
    /// plugin you can use this if you do not require any special configuration in the Composite.config file.
    /// </summary>
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
