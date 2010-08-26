using System.Collections.Generic;
using Composite.Core.Types;


namespace Composite.Core.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class OpenGenericViewParams
    {
        public string ViewId { get; set; }
        public string EntityToken { get; set; }

        public string Label { get; set; }
        public string ToolTip { get; set; }
        public string Image { get; set; }        
        
        public string Url { get; set; }
        public List<KeyValuePair> UrlPostArguments { get; set; }          
    }
}
