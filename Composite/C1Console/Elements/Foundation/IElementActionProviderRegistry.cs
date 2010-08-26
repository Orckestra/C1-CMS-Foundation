using System.Collections.Generic;


namespace Composite.C1Console.Elements.Foundation
{
    internal interface IElementActionProviderRegistry
    {
        IEnumerable<string> ElementActionProviderNames { get; }
        void OnFlush();
    }
}
