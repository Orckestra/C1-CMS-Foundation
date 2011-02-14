using System.Collections.Generic;

namespace Composite.Core.WebClient.Services.TreeServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class RefreshChildrenInfo
	{
        /// <exclude />
        public string ElementKey { get; set; }

        /// <exclude />
        public List<ClientElement> ClientElements { get; set; }
	}
}
