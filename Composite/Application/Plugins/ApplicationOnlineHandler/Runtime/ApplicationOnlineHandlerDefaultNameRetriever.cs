using System;
using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Application.Plugins.ApplicationOnlineHandler.Runtime
{
    internal sealed class ApplicationOnlineHandlerDefaultNameRetriever : IConfigurationNameMapper
	{
        public string MapName(string name, IConfigurationSource configSource)
        {
            if (null == configSource) throw new ArgumentNullException("configSource");

            if (null != name)
            {
                return name;
            }
            else
            {
                ApplicationOnlineHandlerSettings settings = configSource.GetSection(ApplicationOnlineHandlerSettings.SectionName) as ApplicationOnlineHandlerSettings;

                if (null == settings)
                {
                    throw new ConfigurationErrorsException(string.Format("Could not load configuration section {0}", ApplicationOnlineHandlerSettings.SectionName));
                }

                return settings.DefaultApplicationOnlineHandler;
            }
        }
	}
}
