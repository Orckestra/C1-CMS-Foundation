using Composite.C1Console.Components;
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

            foreach (var componentFile in Directory.GetFiles(HostingEnvironment.MapPath("~/App_Data/Components/"),"*.xml",SearchOption.AllDirectories))
            {
                var ns = XNamespace.Get("http://cms.orckestra.com/blip/blop/foo/bar");
                var doc = XDocument.Load(componentFile);
                var el = doc.Descendants().First();

                if (el != null)
                {
                    yield return new Component
                    {
                        Title = el.GetAttributeValue(ns + "title") ?? Path.GetFileNameWithoutExtension(componentFile),
                        Description = el.GetAttributeValue(ns + "description")?? Path.GetFileNameWithoutExtension(componentFile),
                        GroupingTags = el.GetAttributeValue(ns + "tags").Split(',').ToList(),
                        ComponentDefinition = el.Document

                    };
                }
            }
        }
    }
}
