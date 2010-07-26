using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Composite.Actions
{
    internal interface IElementInformationService : IFlowControllerService
	{
        string ProviderName { get; }
        Dictionary<string, string> Piggyback { get; }
	}
}
