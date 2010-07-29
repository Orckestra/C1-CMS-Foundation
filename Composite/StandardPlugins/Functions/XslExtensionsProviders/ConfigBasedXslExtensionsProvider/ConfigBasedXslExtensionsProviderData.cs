using System.Configuration;
using Composite.Configuration;
using Composite.Functions.Plugins.XslExtensionsProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.StandardPlugins.Functions.XslExtensionsProviders.ConfigBasedXslExtensionsProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Assembler(typeof(ConfigBasedXslExtensionsProviderAssembler))]
	internal sealed class ConfigBasedXslExtensionsProviderData: XslExtensionsProviderData
	{

        public const string SectionName = "Composite.XslExtensions";

        private const string _xslExtensionsProperty = "xslExtensions";
        [ConfigurationProperty(_xslExtensionsProperty)]
        public NameTypeManagerTypeConfigurationElementCollection<ConfigBasedXslExtensionInfo> XslExtensions
        {
            get
            {
                return (NameTypeManagerTypeConfigurationElementCollection<ConfigBasedXslExtensionInfo>)base[_xslExtensionsProperty];
            }
        }
	}



    internal sealed class ConfigBasedXslExtensionsProviderAssembler : IAssembler<IXslExtensionsProvider, XslExtensionsProviderData>
    {
        public IXslExtensionsProvider Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, XslExtensionsProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            ConfigBasedXslExtensionsProviderData myConfiguration = (ConfigBasedXslExtensionsProviderData)objectConfiguration;
            return new ConfigBasedXslExtensionsProvider(myConfiguration);
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ConfigBasedXslExtensionInfo : NameTypeManagerTypeConfigurationElement
    {
    }
}

