using System.Collections.Generic;


namespace Composite.Elements.Foundation
{
    internal interface IElementActionProviderRegistry
    {
        IEnumerable<string> ElementActionProviderNames { get; }
        void OnFlush();
    }
}
