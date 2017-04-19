using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Composite.Core.WebClient.Services.TreeServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class ClientBrowserViewSettings
    {
        /// <summary>
        /// Url to load in browser
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// True if tooling (view, SEO tools etc) should be active for URL
        /// </summary>
        public bool ToolingOn { get; set; }
    }
}
