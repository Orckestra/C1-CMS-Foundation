using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Types;

namespace Composite.Renderings.Template
{
	public class TemplatePlaceholdersInfo
	{
        public IEnumerable<KeyValuePair> Placeholders { get; set; }
        public string DefaultPlaceholderId { get; set; }
	}
}
