using System;
using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Core.IO.Plugins.IOProvider.Runtime
{
    internal sealed class IOProviderDefaultNameRetriever : IConfigurationNameMapper
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
                IOProviderSettings settings = configSource.GetSection(IOProviderSettings.SectionName) as IOProviderSettings;

                if (null == settings)
                {
                    throw new ConfigurationErrorsException(string.Format("Could not load configuration section {0}", IOProviderSettings.SectionName));
                }

                return settings.DefaultIOProvider;
            }
        }
    }
}
