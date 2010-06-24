using System;
using System.Collections.Generic;
using Composite.Security;


namespace Composite.WebClient
{
    [Obsolete]
    public sealed class ElementInformation
    {
        public EntityToken EntityToken { get; set; }
        public Dictionary<string, string> Piggyback { get; set; }
    }
}
