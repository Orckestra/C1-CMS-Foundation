using System.Collections.Generic;
using Composite.Core.Types;


namespace Composite.Core.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class OpenGenericViewParams
    {
        /// <exclude />
        public string ViewId { get; set; }

        /// <exclude />
        public string EntityToken { get; set; }

        /// <exclude />
        public string Label { get; set; }

        /// <exclude />
        public string ToolTip { get; set; }

        /// <exclude />
        public string Image { get; set; }

        /// <exclude />
        public string Url { get; set; }

        /// <exclude />
        public List<KeyValuePair> UrlPostArguments { get; set; }          
    }
}
