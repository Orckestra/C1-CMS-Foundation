using System;
using System.Collections.Generic;
using System.Xml.Xsl;
using Composite.Functions.Foundation;
using Composite.Functions.Foundation.PluginFacades;
using Composite.Logging;
using Composite.StringExtensions;
using Composite.Types;

namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class XslExtensionsManager
	{
        public static void Register(XsltArgumentList argumentList)
        {
            foreach(string providerName in XslExtensionsProviderRegistry.XslExtensionsProviderNames)
            {
                List<Pair<string, object>> extensions;
                try
                {
                    extensions = XslExtensionsProviderPluginFacade.CreateExtensions(providerName);
                }
                catch(Exception ex)
                {
                    string message = "Failed to get xsl extensions from provider '{0}'".FormatWith(providerName);
                    LoggingService.LogError("XslExtensionsManager", new InvalidOperationException(message, ex));
                    continue;
                }

                if(extensions != null)
                {
                    foreach (Pair<string, object> pair in extensions)
                    {
                        argumentList.AddExtensionObject(pair.First, pair.Second);
                    }
                }
            }
        }
	}
}
