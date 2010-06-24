using System;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.WebClient.Plugins.WebRequestHandler
{
    [Assembler(typeof(NonConfigurableWebRequestHandlerAssembler))]
    public class NonConfigurableWebRequestHandler : WebRequestHandlerData
    {
    }

    public class NonConfigurableWebRequestHandlerAssembler : IAssembler<WebRequestHandler, WebRequestHandlerData>
    {
        public WebRequestHandler Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, WebRequestHandlerData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            if (null == objectConfiguration) throw new ArgumentNullException("objectConfiguration");

            return (WebRequestHandler)Activator.CreateInstance(objectConfiguration.Type);
        }
    }

}
