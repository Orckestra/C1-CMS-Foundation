using System;
using Microsoft.Practices.ObjectBuilder;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Renderings.Plugins.RenderingResponseHandler
{
    [Assembler(typeof(NonConfigurableRenderingResponseHandlerAssembler))]
    internal sealed class NonConfigurableRenderingResponseHandler : RenderingResponseHandlerData
    {
    }

    internal sealed class NonConfigurableRenderingResponseHandlerAssembler : IAssembler<IRenderingResponseHandler, RenderingResponseHandlerData>
	{
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IRenderingResponseHandler Assemble(IBuilderContext context, RenderingResponseHandlerData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return (IRenderingResponseHandler)Activator.CreateInstance(objectConfiguration.Type);
        }
	}
}
