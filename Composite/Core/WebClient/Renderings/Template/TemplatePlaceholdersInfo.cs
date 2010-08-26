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
        public IEnumerable<KeyValuePair> Placeholders { get; set; }
        public string DefaultPlaceholderId { get; set; }
	}
}
