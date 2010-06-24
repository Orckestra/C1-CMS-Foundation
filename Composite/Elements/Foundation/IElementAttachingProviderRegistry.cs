using System;
using System.Collections.Generic;


namespace Composite.Elements.Foundation
{
    internal interface IElementAttachingProviderRegistry
    {
        IEnumerable<string> ElementAttachingProviderNames { get; }
        Type GetElementProviderType(string elementProviderName);
        void OnFlush();
    }
}
