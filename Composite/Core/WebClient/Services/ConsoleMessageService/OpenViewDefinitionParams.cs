using System.Collections.Generic;

using Composite.Core.Types;


namespace Composite.Core.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class OpenViewDefinitionParams
    {
        /// <exclude />
        public string ViewId { get; set; }

        /// <exclude />
        public string EntityToken { get; set; }

        /// <exclude />
        public string Handle { get; set; }

        /// <exclude />
        public List<KeyValuePair> Argument { get; set; }  
    }
}
