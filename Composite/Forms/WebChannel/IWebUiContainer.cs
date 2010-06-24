using Composite.Forms.Flows;
using System.Collections.Generic;

namespace Composite.Forms.WebChannel
{
	public interface IWebUiContainer : IUiContainer
	{
        void ShowFieldMessages(Dictionary<string, string> clientIDPathedMessages);
	}
}
