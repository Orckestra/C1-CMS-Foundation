using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.RichContent.Components;
using Composite.Core;
using Composite.Core.Application;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;
using Microsoft.Extensions.DependencyInjection;

namespace Composite.Plugins.Components.ComponentTags
{
    /// <exclude />
    [ApplicationStartup]
    public class TagManagerRegistrar
    {
        /// <exclude />
        public void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection.Add(ServiceDescriptor.Singleton(new TagManager()));
        }
    }

    /// <summary>
    /// Service for working with component tags
    /// </summary>
    public class TagManager
    {
        private static Dictionary<string, string> _tagToTitleMap;
        private const string TagConfigurationsRelativePath = "~/App_Data/Composite/Configuration/ComponentTags.xml";

        internal TagManager()
        {
            var doc = XDocumentUtils.Load(PathUtil.Resolve(TagConfigurationsRelativePath));

            _tagToTitleMap = (from element in doc.Root?.Elements()
                select new {Name = element.GetAttributeValue("name"), Value = element.GetAttributeValue("title")})
                .ToDictionary(o => o.Name, o => o.Value);
        }

        /// <summary>
        /// Tries to find a locale title for given tag
        /// </summary>
        /// <param name="tag"></param>
        /// <returns></returns>
        public string GetTagTitle(string tag)
        {
            if (_tagToTitleMap.ContainsKey(tag))
            {
                return StringResourceSystemFacade.ParseString(_tagToTitleMap[tag]);
            }

            return tag;
        }

        /// <summary>
        /// return a list of tags based on their ordering in configuration file
        /// </summary>
        /// <returns></returns>
        public IEnumerable<string> GetRegisteredTagOrdering()
        {
            return _tagToTitleMap.Select(f => GetTagTitle(f.Key));
        }
        /// <summary>
        /// return a list of all tags based on their ordering in configuration file
        /// </summary>
        /// <returns></returns>
        public IEnumerable<string> GetAllTags()
        {
            var componentManager = ServiceLocator.GetRequiredService<ComponentManager>();
            return GetRegisteredTagOrdering().Union(componentManager.GetComponents().SelectMany(f=>f.GroupingTags));
        }
    }

}
