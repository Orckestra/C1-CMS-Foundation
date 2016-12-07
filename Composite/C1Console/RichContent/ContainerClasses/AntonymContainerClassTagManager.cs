using System.Collections.Generic;

#warning Mocked
namespace Composite.C1Console.RichContent.ContainerClasses
{
    public static class AntonymContainerClassTagManager
    {
        private static readonly Dictionary<string, string> AntonymDictionaryFromConfig 
            = new Dictionary<string, string>() { { "wide","narrow"}, { "narrow", "wide" } };

        public static string GetAntonym(string str)
        {
            return AntonymDictionaryFromConfig.ContainsKey(str) ? AntonymDictionaryFromConfig[str] : "";
        }
    }
}
