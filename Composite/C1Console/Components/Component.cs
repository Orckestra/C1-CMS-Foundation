using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Composite.C1Console.Components
{
    public class Component
    {
        public virtual string Title { get; set; }
        public virtual string Description { get; set; }
        public virtual IEnumerable<string> GroupingTags { get; set; }
        public virtual XDocument ComponentDefinition { get; set; }
    }
}
