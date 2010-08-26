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
        public string Name { get; set; }
        public string IsoName { get; set; }
        public string UrlMappingName { get; set; }
        public string Url { get; set; }
        public bool IsCurrent { get; set; }
	}
}
