using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Composite.C1Console.Actions
{
    internal interface IElementInformationService : IFlowControllerService
	{
        string ProviderName { get; }
        Dictionary<string, string> Piggyback { get; }
	}
}
