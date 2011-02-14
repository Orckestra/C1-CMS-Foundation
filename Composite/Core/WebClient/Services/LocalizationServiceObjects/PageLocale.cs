using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;


namespace Composite.Core.WebClient.Services.LocalizationServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("Culture = {Name}, IsCurrent = {IsCurrent}, Url = {Url}")]
	public sealed class PageLocale
	{
        /// <exclude />
        public string Name { get; set; }

        /// <exclude />
        public string IsoName { get; set; }

        /// <exclude />
        public string UrlMappingName { get; set; }

        /// <exclude />
        public string Url { get; set; }

        /// <exclude />
        public bool IsCurrent { get; set; }
	}
}
