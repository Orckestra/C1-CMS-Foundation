using System;
using System.Collections.Specialized;

namespace Composite.Core.Routing
{
    /// <summary> 
    /// Information stored in a media url
    /// </summary>
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class MediaUrlData
    {

        /// <summary>
        /// Gets or sets the media id.
        /// </summary>
        /// <value>
        /// The media id.
        /// </value>
        public Guid MediaId { get; set; }


        /// <summary>
        /// Gets or sets the media store.
        /// </summary>
        /// <value>
        /// The media store.
        /// </value>
        public string MediaStore { get; set; }


        /// <summary>
        /// Gets or sets the query parameters.
        /// </summary>
        /// <value>
        /// The query parameters.
        /// </value>
        public NameValueCollection QueryParameters { get; set; }
    }
}
