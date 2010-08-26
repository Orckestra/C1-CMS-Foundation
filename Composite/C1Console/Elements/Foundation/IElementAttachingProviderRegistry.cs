using System;
using System.Collections.Generic;


namespace Composite.C1Console.Elements.Foundation
{
    internal interface IElementAttachingProviderRegistry
    {
        IEnumerable<string> ElementAttachingProviderNames { get; }
        Type GetElementProviderType(string elementProviderName);
        void OnFlush();
    }
}
