using System;
using System.Collections.Generic;
using Composite.C1Console.Security;


namespace Composite.Core.WebClient
{
    [Obsolete]
    internal sealed class ElementInformation
    {
        public EntityToken EntityToken { get; set; }
        public Dictionary<string, string> Piggyback { get; set; }
    }
}
