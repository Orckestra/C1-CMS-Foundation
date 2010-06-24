using System.Collections.Generic;

using Composite.Types;


namespace Composite.WebClient.Services.ConsoleMessageService
{
    public class OpenViewDefinitionParams
    {
        public string ViewId { get; set; }
        public string EntityToken { get; set; }
        public string Handle { get; set; }
        public List<KeyValuePair> Argument { get; set; }  
    }
}
