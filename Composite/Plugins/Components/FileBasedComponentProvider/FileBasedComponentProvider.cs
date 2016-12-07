using Composite.C1Console.RichContent.Components;
using Composite.Core.Application;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.RichContent.ContainerClasses;
using Composite.Core;
using Composite.Core.IO;
using Composite.Core.Linq;
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
        }

        /// <exclude />
        public string ProviderId => nameof(FileBasedComponentProvider);

        /// <exclude />
        public IEnumerable<Component> GetComponents()
        {
            // search files, build up list here. No reason to cache locally in this provider.

            _changeNotifier.ProviderChange(this.ProviderId);

            return GetComponentsFromFile();
        }

        private IEnumerable<Component> GetComponentsFromFile()
        {
            foreach (
                var componentFile in C1Directory.GetFiles(PathUtil.Resolve(_providerDirectory), _searchPattern, _searchOption))
            {
                var xNamespace = XNamespace.Get("http://cms.orckestra.com/blip/blop/foo/bar");
                var doc = XDocumentUtils.Load(componentFile);
                var xElement = doc.Descendants().FirstOrDefault();

                if (xElement != null)
                {
                    var title = xElement.GetAttributeValue(xNamespace + "title") ??
                                Path.GetFileNameWithoutExtension(componentFile);

                    var description = xElement.GetAttributeValue(xNamespace + "description") ?? title;

                    var groupingTagsRaw = xElement.GetAttributeValue(xNamespace + "tags") ??
                                          GuessGroupingTagsBasedOnPath(componentFile);

                    var tagManager = ServiceLocator.GetRequiredService<TagManager>();
                    var groupingTags = groupingTagsRaw.ToLower().Split(',').Select(tagManager.GetTagTitle).ToList();

                    var containerClasses =
                        ContainerClassManager.ParseToList(xElement.GetAttributeValue(xNamespace + "container-class"));

                    xElement.RemoveAttributes();

                    yield return new Component
                    {
                        Title = title,
                        Description = description,
                        GroupingTags = groupingTags,
                        ContainerClasses = containerClasses,
                        ComponentDefinition = xElement.Document
                    };
                }
            }
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
    }
}
