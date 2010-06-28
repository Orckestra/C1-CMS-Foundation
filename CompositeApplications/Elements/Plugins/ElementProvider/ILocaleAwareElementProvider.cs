using System.Collections.Generic;
using Composite.Elements.Plugins.ElementProvider;
using Composite.Security;

// The namespace is wrong but is left for backwards compatibility
namespace Composite.Elements
{
    internal interface ILocaleAwareElementProvider : IHooklessElementProvider
    {
        bool ContainsLocalizedData { get; }

        IEnumerable<Element> GetForeignRoots(SearchToken searchToken);
        IEnumerable<Element> GetForeignChildren(EntityToken entityToken, SearchToken searchToken);
    }
}
