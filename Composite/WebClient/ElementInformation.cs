using System;
using System.Collections.Generic;
using Composite.Security;


namespace Composite.WebClient
{
    [Obsolete]
    internal sealed class ElementInformation
    {
        public EntityToken EntityToken { get; set; }
        public Dictionary<string, string> Piggyback { get; set; }
    }
}
