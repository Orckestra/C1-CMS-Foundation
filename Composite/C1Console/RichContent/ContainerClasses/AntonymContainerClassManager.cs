using System.Collections.Generic;
using System.Linq;
using System.Xml;
using System.Xml.Linq;
using Composite.Core;
using Composite.Core.IO;
using Composite.Core.Xml;

namespace Composite.C1Console.RichContent.ContainerClasses
{
    internal static class AntonymContainerClassManager
    {
        private static readonly Dictionary<string, string> AntonymDictionaryFromConfig = AntonymContainerClassLoader();

        private const string AntonymClassConfigurationsRelativePath = "~/App_Data/Composite/Configuration/AntonymClassDefinitions.xml";

        private static Dictionary<string,string> AntonymContainerClassLoader()
        {
            XDocument document = null;

            try
            {
                document = XDocumentUtils.Load(PathUtil.Resolve(AntonymClassConfigurationsRelativePath));
            }
            catch (XmlException exception)
            {
                Log.LogWarning(nameof(AntonymContainerClassManager),$"error in parsing config file: {exception}");
                return new Dictionary<string, string>();
            }
            

            return (from element in document.Root?.Elements()
                              select new { Name = element.GetAttributeValue("name"), Value = element.GetAttributeValue("antonym") })
                .ToDictionary(o => o.Name, o => o.Value);
        }

        public static string GetAntonym(string str)
        {
            return AntonymDictionaryFromConfig.ContainsKey(str) ? AntonymDictionaryFromConfig[str] : "";
        }
    }
}
