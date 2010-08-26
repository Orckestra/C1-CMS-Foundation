using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.Globalization;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Plugins.ResourceProvider;
using Composite.Plugins.ResourceSystem.FileSystemBasedIconResourceProvider.Foundation;
using Composite.Core.WebClient;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.ResourceSystem.FileSystemBasedIconResourceProvider
{
    [ConfigurationElementType(typeof(FileSystemBasedIconResourceProviderData))]
	internal sealed class FileSystemBasedIconResourceProvider : IIconResourceProvider
	{
        private FileSystemBasedIconResourceProviderHelper _helper;

        public const string _iconMappingsFileName = "StandardIcons.xml";

        public readonly string _baseDirectoryPath;

        public FileSystemBasedIconResourceProvider(string baseDirectoryPath, string iconMappingsFilename)
        {
            _baseDirectoryPath = UrlUtils.ResolveAdminUrl("images/icons");
            _helper = new FileSystemBasedIconResourceProviderHelper(baseDirectoryPath, iconMappingsFilename);
        }



        public IEnumerable<string> GetIconNames()
        {
            return _helper.GetIconNames();
        }



        public Bitmap GetIcon(string name, IconSize iconSize, CultureInfo cultureInfo)
        {
            return _helper.GetIcon(name, iconSize, cultureInfo);
        }
    }




    [Assembler(typeof(FileSystemBasedIconResourceProviderAssembler))]
    internal sealed class FileSystemBasedIconResourceProviderData : ResourceProviderData
    {
        private const string _baseDirectoryPathPropertyName = "baseDirectoryPath";
        [ConfigurationProperty(_baseDirectoryPathPropertyName, IsRequired = true)]
        public string BaseDirectoryPath
        {
            get { return (string)base[_baseDirectoryPathPropertyName]; }
            set { base[_baseDirectoryPathPropertyName] = value; }
        }

        private const string _iconMappingsFilenamePropertyName = "iconMappingsFilename";
        [ConfigurationProperty(_iconMappingsFilenamePropertyName, IsRequired = true)]
        public string IconMappingsFilename
        {
            get { return (string)base[_iconMappingsFilenamePropertyName]; }
            set { base[_iconMappingsFilenamePropertyName] = value; }
        }
    }




    internal sealed class FileSystemBasedIconResourceProviderAssembler : IAssembler<IResourceProvider, ResourceProviderData>
    {
        public IResourceProvider Assemble(IBuilderContext context, ResourceProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            FileSystemBasedIconResourceProviderData data = (FileSystemBasedIconResourceProviderData)objectConfiguration;

            return new FileSystemBasedIconResourceProvider(data.BaseDirectoryPath, data.IconMappingsFilename);
        }
    }
}
