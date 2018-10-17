using System;

namespace Composite.AspNet
{
    /// <summary>
    /// 
    /// </summary>
    public interface ISchemaOrgSiteMapNode
    {
        /// <summary>
        /// Gets or sets the last modified.
        /// </summary>
        /// <value>
        /// The last modified.
        /// </value>
        DateTime LastModified { get; }

        /// <summary>
        /// Gets or sets the change frequency.
        /// </summary>
        /// <value>
        /// The change frequency.
        /// </value>
        SiteMapNodeChangeFrequency? ChangeFrequency { get; }

        /// <summary>
        /// Gets or sets the priority.
        /// </summary>
        /// <value>
        /// The priority.
        /// </value>
        int? Priority { get; }
    }
}
