using System.Xml;
using Composite.Security;
using System.Collections.Generic;


namespace Composite.Elements.Plugins.ElementProvider
{
    internal interface ICustomSearchElementProvider : IHooklessElementProvider
    {
        SearchToken GetNewSearchToken(EntityToken entityToken);
        XmlReader GetSearchFormDefinition(EntityToken entityToken);
        Dictionary<string, object> GetSearchFormBindings(EntityToken entityToken);
    }
}
