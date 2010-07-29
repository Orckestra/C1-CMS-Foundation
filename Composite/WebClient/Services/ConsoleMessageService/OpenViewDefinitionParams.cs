using System.Collections.Generic;

using Composite.Types;


namespace Composite.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class OpenViewDefinitionParams
    {
        public string ViewId { get; set; }
        public string EntityToken { get; set; }
        public string Handle { get; set; }
        public List<KeyValuePair> Argument { get; set; }  
    }
}
