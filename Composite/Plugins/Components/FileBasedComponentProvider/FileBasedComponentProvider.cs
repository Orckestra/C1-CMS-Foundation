using System;
using Composite.C1Console.RichContent.Components;
using Composite.Core.Application;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reactive.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Xml;
using System.Xml.Linq;
using Castle.Core.Internal;
using Composite.C1Console.RichContent.ContainerClasses;
using Composite.Core;
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Plugins.Components.ComponentTags;

namespace Composite.Plugins.Components.FileBasedComponentProvider
{
    /// <exclude />
    [ApplicationStartup()]
    public class FileBasedComponentProviderRegistrator
    {
        /// <exclude />
        public void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton(typeof(IComponentProvider), typeof(FileBasedComponentProvider));
        }
    }

    /// <exclude />
    public class FileBasedComponentProvider : IComponentProvider
    {
        private const string Title = "title";
        private const string Description = "description";
        private const string Tags = "tags";
        private const string ContainerClasses = "container-classes";
        private const string Image = "image";
        private const string Icon = "icon";
        private const string AntiTags = "container-anti-classes";

        private readonly ComponentChangeNotifier _changeNotifier;
        private readonly string _providerDirectory;
        private readonly string _searchPattern;
        private readonly SearchOption _searchOption;

        /// <exclude />
        public FileBasedComponentProvider(ComponentChangeNotifier changeNotifier)
        {
            _changeNotifier = changeNotifier;

            var componentProviderSetting = ComponentProviderSettings.GetProviderPath(nameof(FileBasedComponentProvider));
            Verify.IsNotNull(componentProviderSetting, "No components configuration found for the provider " + nameof(FileBasedComponentProvider));
            
            _providerDirectory = componentProviderSetting.Directory;
            _searchPattern = componentProviderSetting.FileSearchPattern;
            _searchOption = componentProviderSetting.TopDirectoryOnly
                ? SearchOption.TopDirectoryOnly
                : SearchOption.AllDirectories;

            Directory.CreateDirectory(PathUtil.Resolve(_providerDirectory));

            FileBasedComponentObservable().Subscribe( x => _changeNotifier.ProviderChange(x.ProviderId));
        }

        /// <exclude />
        public string ProviderId => nameof(FileBasedComponentProvider);

        /// <exclude />
        public IEnumerable<Component> GetComponents()
        {
            return GetAllComponents();
        }

        private IEnumerable<Component> GetAllComponents()
        {
            return C1Directory.GetFiles(
                PathUtil.Resolve(_providerDirectory), _searchPattern, _searchOption)
                .Select(GetComponentsFromFile).Where(f => f != null);
        }

        private Component GetComponentsFromFile(string componentFile)
        {
            XDocument document =null;

            try
            {
                document = XDocumentUtils.Load(componentFile);
            }
            catch (XmlException exception)
            {
                Log.LogError(nameof(FileBasedComponentProvider),$"Error in reading component file: {exception}");
                return null;
            }

            var xElement = document.Descendants().FirstOrDefault();

            if (xElement != null)
            {
#warning making id based on file location, check again once function based provider come alive
                var xmlBytes = new UnicodeEncoding().GetBytes(componentFile);
                var hashedXmlBytes = ((HashAlgorithm)CryptoConfig.CreateFromName("MD5")).ComputeHash(xmlBytes);
                var id = new Guid(hashedXmlBytes);

                var title = xElement.GetAttributeValue(Namespaces.Components + Title) ??
                            Path.GetFileNameWithoutExtension(componentFile);

                var description = xElement.GetAttributeValue(Namespaces.Components + Description) ?? "";

                var groupingTagsRaw = xElement.GetAttributeValue(Namespaces.Components + Tags) ??
                                        GuessGroupingTagsBasedOnPath(componentFile);

                List<string> groupingTags = new List<string>();

                if (!groupingTagsRaw.IsNullOrEmpty())
                {
                    var tagManager = ServiceLocator.GetRequiredService<TagManager>();
                    groupingTags.AddRange(
                        groupingTagsRaw.ToLower()
                            .Split(',')
                            .Select(f => f.Trim())
                            .Select(tagManager.GetTagTitle)
                            .ToList());
                }

                var containerClasses =
                    ContainerClassManager.ParseToList(xElement.GetAttributeValue(Namespaces.Components + ContainerClasses));

                var antiTags =
                    ContainerClassManager.ParseToList(xElement.GetAttributeValue(Namespaces.Components + AntiTags));

                var componentImage = new ComponentImage()
                {
                    CustomImageUri = xElement.GetAttributeValue(Namespaces.Components + Image),
                    IconName = xElement.GetAttributeValue(Namespaces.Components + Icon)
                };

                xElement.Attributes().Where(f=>f.Name.Namespace == Namespaces.Components).Remove();

                return new Component
                {
                    Id = id,
                    Title = title,
                    Description = description,
                    GroupingTags = groupingTags,
                    ContainerClasses = containerClasses,
                    AntiTags = antiTags,
                    ComponentImage = componentImage,
                    ComponentDefinition = xElement.Document.GetDocumentAsString()
                };
            }

            return null;

        }

        private string GuessGroupingTagsBasedOnPath(string componentFile)
        {
            var componentPath = Path.GetDirectoryName(componentFile);

            var cleanedProviderDirectory = _providerDirectory.Replace('/', '\\').Replace("~", "");

            var componentPathfromComponentFolder =
                componentPath?.Substring(
                    componentPath.IndexOf(cleanedProviderDirectory,
                        StringComparison.Ordinal) + cleanedProviderDirectory.Length);

            return componentPathfromComponentFolder?.Replace('\\', ',').Trim(',');
        }

        private IObservable<ComponentChange> FileBasedComponentObservable()
        {
            var fileSystemWatcher = new FileSystemWatcher
            {
                Path = PathUtil.Resolve(_providerDirectory),
                IncludeSubdirectories = _searchOption == SearchOption.AllDirectories,
                EnableRaisingEvents = true,
                Filter = _searchPattern
            };

            return Observable.FromEventPattern<FileSystemEventHandler, FileSystemEventArgs>(
                        h => fileSystemWatcher.Deleted += h,
                        h => fileSystemWatcher.Deleted -= h)
                        .Select(e => new ComponentChange() { ProviderId = nameof(FileBasedComponentProvider) })
                      .Merge(Observable.FromEventPattern<FileSystemEventHandler, FileSystemEventArgs>(
                        h => fileSystemWatcher.Changed += h,
                        h => fileSystemWatcher.Changed -= h)
                        .Select(e => new ComponentChange() { ProviderId = nameof(FileBasedComponentProvider) }))
                      .Merge(Observable.FromEventPattern<FileSystemEventHandler, FileSystemEventArgs>(
                        h => fileSystemWatcher.Created += h,
                        h => fileSystemWatcher.Created -= h)
                        .Select(e => new ComponentChange() { ProviderId = nameof(FileBasedComponentProvider) }))
                      .Merge(Observable.FromEventPattern<RenamedEventHandler, RenamedEventArgs>(
                        h => fileSystemWatcher.Renamed += h,
                        h => fileSystemWatcher.Renamed -= h)
                        .Select(e => new ComponentChange() { ProviderId = nameof(FileBasedComponentProvider) }));
        }
    }
}
