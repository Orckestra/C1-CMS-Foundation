using System.Collections.Generic;
using System.Linq;
using Composite.Core.Configuration;
using Composite.Functions.Plugins.XslExtensionsProvider.Runtime;

namespace Composite.Functions.Foundation
{
	internal static class XslExtensionsProviderRegistry
	{
        public static IEnumerable<string> XslExtensionsProviderNames 
        { 
            get
            {
                XslExtensionsProviderSettings settings = 
                    ConfigurationServices.ConfigurationSource.GetSection(XslExtensionsProviderSettings.SectionName) 
                    as XslExtensionsProviderSettings;

                return settings.XslExtensionProviders.Select(provider => provider.Name);
            }
        }
	}
}
