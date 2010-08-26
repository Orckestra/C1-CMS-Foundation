using System.Xml;
using Composite.C1Console.Security;
using System.Collections.Generic;


namespace Composite.C1Console.Elements.Plugins.ElementProvider
{
    internal interface ICustomSearchElementProvider : IHooklessElementProvider
    {
        SearchToken GetNewSearchToken(EntityToken entityToken);
        XmlReader GetSearchFormDefinition(EntityToken entityToken);
        Dictionary<string, object> GetSearchFormBindings(EntityToken entityToken);
    }
}
