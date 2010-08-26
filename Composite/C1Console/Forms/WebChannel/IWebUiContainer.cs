using Composite.C1Console.Forms.Flows;
using System.Collections.Generic;

namespace Composite.C1Console.Forms.WebChannel
{
	internal interface IWebUiContainer : IUiContainer
	{
        void ShowFieldMessages(Dictionary<string, string> clientIDPathedMessages);
	}
}
