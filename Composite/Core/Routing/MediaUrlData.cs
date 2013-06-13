using System;
using System.Collections.Specialized;
using Composite.Data.Types;

namespace Composite.Core.Routing
{
    /// <summary> 
    /// Information stored in a media url
    /// </summary>
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class MediaUrlData
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MediaUrlData"/> class.
        /// </summary>
        public MediaUrlData() {}

        /// <summary>
        /// Initializes a new instance of the <see cref="MediaUrlData" /> class.
        /// </summary>
        /// <param name="mediaStore">The media store.</param>
        /// <param name="mediaId">The media id.</param>
        /// <param name="queryParameters">The query parameters.</param>
        public MediaUrlData(string mediaStore, Guid mediaId, NameValueCollection queryParameters = null)
        {
            MediaStore = mediaStore;
            MediaId = mediaId;
            QueryParameters = queryParameters ?? new NameValueCollection();
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="MediaUrlData"/> class.
        /// </summary>
        /// <param name="mediaFile">The media file.</param>
        public MediaUrlData(IMediaFile mediaFile)
        {
            MediaStore = mediaFile.StoreId;
            MediaId = mediaFile.Id;
            QueryParameters = new NameValueCollection();
        }


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
