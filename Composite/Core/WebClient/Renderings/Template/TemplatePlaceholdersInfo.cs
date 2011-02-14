using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Core.Types;

namespace Composite.Core.WebClient.Renderings.Template
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class TemplatePlaceholdersInfo
	{
        /// <exclude />
        public IEnumerable<KeyValuePair> Placeholders { get; set; }

        /// <exclude />
        public string DefaultPlaceholderId { get; set; }
	}
}
