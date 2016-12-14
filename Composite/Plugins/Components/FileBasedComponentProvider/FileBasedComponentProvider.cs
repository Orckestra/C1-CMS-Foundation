using System;
using Composite.C1Console.RichContent.Components;
using Composite.Core.Application;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Xml.Linq;
using Castle.Core.Internal;
using Composite.C1Console.RichContent.ContainerClasses;
using Composite.Core;
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Plugins.Components.ComponentTags;

#warning Code gone A MOCK! This is far from done.

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
        private const string ContainerClass = "container-class";
        private const string Image = "image";
        private const string Icon = "icon";

        private readonly ComponentChangeNotifier _changeNotifier;
        private readonly string _providerDirectory;
        private readonly string _searchPattern;
        private readonly SearchOption _searchOption;

        /// <exclude />
        public FileBasedComponentProvider(ComponentChangeNotifier changeNotifier)
        {
            _changeNotifier = changeNotifier;

            var componentProviderSetting = ComponentProviderSettings.GetProviderPath(nameof(FileBasedComponentProvider));
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
            // search files, build up list here. No reason to cache locally in this provider.
            _changeNotifier.ProviderChange(this.ProviderId);

            return GetAllComponents();
        }

        private IEnumerable<Component> GetAllComponents()
        {
            return C1Directory.GetFiles(
                PathUtil.Resolve(_providerDirectory), _searchPattern, _searchOption)
                .Select(GetComponentsFromFile);
        }

        private Component GetComponentsFromFile(string componentFile)
        {

            var doc = XDocumentUtils.Load(componentFile);
            var xElement = doc.Descendants().FirstOrDefault();

            if (xElement != null)
            {
#warning making id based on file location, check again once function based provider come alive
                var xmlBytes = new UnicodeEncoding().GetBytes(componentFile);
                var hashedXmlBytes = ((HashAlgorithm)CryptoConfig.CreateFromName("MD5")).ComputeHash(xmlBytes);
                var id = new Guid(hashedXmlBytes);

                var title = xElement.GetAttributeValue(Namespaces.Components + Title) ??
                            Path.GetFileNameWithoutExtension(componentFile);

                var description = xElement.GetAttributeValue(Namespaces.Components + Description) ?? title;

                var groupingTagsRaw = xElement.GetAttributeValue(Namespaces.Components + Tags) ??
                                        GuessGroupingTagsBasedOnPath(componentFile);

                var tagManager = ServiceLocator.GetRequiredService<TagManager>();
                var groupingTags = groupingTagsRaw.ToLower().Split(',').Select(tagManager.GetTagTitle).ToList();

                var containerClasses =
                    ContainerClassManager.ParseToList(xElement.GetAttributeValue(Namespaces.Components + ContainerClass));

                var imageUri = new ImageUri()
                {
                    CustomImageUri = xElement.GetAttributeValue(Namespaces.Components + Image),
                    IconName = xElement.GetAttributeValue(Namespaces.Components + Icon)
                };

                xElement.RemoveAttributes();

                return new Component
                {
                    Id = id,
                    Title = title,
                    Description = description,
                    GroupingTags = groupingTags,
                    ContainerClasses = containerClasses,
                    ImageUri = imageUri,
                    ComponentDefinition = xElement.Document
                };
            }

            return null;

        }

        private string GuessGroupingTagsBasedOnPath(string componentFile)
        {
            return Path.GetDirectoryName(componentFile)?
                .Substring(
                    Path.GetDirectoryName(componentFile)
                        .IndexOf(_providerDirectory.Replace('/', '\\').Replace("~", "")) +
                    _providerDirectory.Length)
                .Replace(" ","").Replace('\\', ',');
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
                      .Merge(Observable.FromEventPattern<RenamedEventHandler, RenamedEventArgs>(
                        h => fileSystemWatcher.Renamed += h,
                        h => fileSystemWatcher.Renamed -= h)
                        .Select(e => new ComponentChange() { ProviderId = nameof(FileBasedComponentProvider) }));
        }
    }
}
