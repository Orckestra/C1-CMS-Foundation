using System.Collections.Generic;

namespace Composite.WebClient.Services.TreeServiceObjects
{
	public class RefreshChildrenInfo
	{
        public string ElementKey { get; set; }
        public List<ClientElement> ClientElements { get; set; }
	}
}
