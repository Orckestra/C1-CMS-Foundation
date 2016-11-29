using Composite.C1Console.Components;
using Composite.Core.Application;
using Composite.Core.Xml;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            yield return new Component
            {
                Title = "Component 1",
                Description = "Yada yahahadada yada",
                GroupingTags = new string[] { "media", "images" },
                ComponentDefinition = new XhtmlDocument()
            };
        }
    }
}
