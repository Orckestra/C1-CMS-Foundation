using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Renderings.Plugins.RenderingResponseHandler.Runtime
{
    internal sealed class RenderingResponseHandlerCustomFactory : AssemblerBasedCustomFactory<IRenderingResponseHandler, RenderingResponseHandlerData>
	{
        protected override RenderingResponseHandlerData GetConfiguration(string name, IConfigurationSource configurationSource)
        {
            RenderingResponseHandlerSettings settings = configurationSource.GetSection(RenderingResponseHandlerSettings.SectionName) as RenderingResponseHandlerSettings;

            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", RenderingResponseHandlerSettings.SectionName));
            }

            return settings.RenderingResponseHandlerPlugins.Get(name);
        }
	}
}
