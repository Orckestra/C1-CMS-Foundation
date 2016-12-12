using System.Collections.Generic;
using System.Xml.Linq;

namespace Composite.C1Console.RichContent.Components
{
    public class Component
    {
        public virtual string Title { get; set; }
        public virtual string Description { get; set; }
        public virtual IEnumerable<string> GroupingTags { get; set; }
        public virtual IEnumerable<string> ContainerClasses { get; set; }
        public virtual ImageUri ImageUri { get; set; }
        public virtual XDocument ComponentDefinition { get; set; }
    }

    public class ImageUri
    {
        public string IconName;
        public string CustomImageUri;
    }
}
