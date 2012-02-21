using System;
using System.Collections.Specialized;

namespace Composite.Core.Routing
{
    /// <summary> 
    /// Represents data incapsulated in a media url   
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class MediaUrlData
    {
        /// <exclude />
        public Guid MediaId { get; set; }

        /// <exclude />
        public string MediaStore { get; set; }

        /// <exclude />
        public NameValueCollection QueryParameters { get; set; }
    }
}
