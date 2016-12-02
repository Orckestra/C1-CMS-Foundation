using Composite.C1Console.RichContent.Components;
using Composite.Core.Application;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Web.Hosting;
using System.Xml.Linq;
using System.Xml.Serialization;
using Composite.Core.IO;
using Composite.Core.Linq;
using Composite.Core.Xml;

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
        const string AppDataComponents = "\\App_Data\\Components\\";
        ComponentChangeNotifier _changeNotifier;

        /// <exclude />
        public FileBasedComponentProvider(ComponentChangeNotifier changeNotifier)
        {
            _changeNotifier = changeNotifier;
        }

        /// <exclude />
        public string ProviderId
        {
            get { return nameof(FileBasedComponentProvider);  }
        }

        /// <exclude />
        public IEnumerable<Component> GetComponents()
        {
            // search files, build up list here. No reason to cache locally in this provider.

            _changeNotifier.ProviderChange(this.ProviderId);

            
            foreach (var componentFile in Directory.GetFiles(HostingEnvironment.MapPath(AppDataComponents),"*.xml",SearchOption.AllDirectories))
            {
                var xNamespace = XNamespace.Get("http://cms.orckestra.com/blip/blop/foo/bar");
                var doc = XDocument.Load(componentFile);
                var xElement = doc.Descendants().First();

                if (xElement != null)
                {
                    var title = xElement.GetAttributeValue(xNamespace + "title") ??
                                Path.GetFileNameWithoutExtension(componentFile);

                    var description = xElement.GetAttributeValue(xNamespace + "description") ?? title;

                    var groupingTagsRaw = xElement.GetAttributeValue(xNamespace + "tags") ??
                                          Path.GetDirectoryName(componentFile)
                                              .Substring(
                                                  Path.GetDirectoryName(componentFile).IndexOf(AppDataComponents) +
                                                  AppDataComponents.Length)
                                              .Replace('\\', ',');

                    var groupingTags = groupingTagsRaw.ToLower().Split(',').ToList();

                    xElement.RemoveAttributes();


                    yield return new Component
                    {
                        Title = title,
                        Description = description,
                        GroupingTags = groupingTags,
                        ComponentDefinition = xElement.Document

                    };


                }
            }
        }
    }
}
