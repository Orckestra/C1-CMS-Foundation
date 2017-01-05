using System;
using System.Collections.Generic;
using System.Xml.Linq;

namespace Composite.C1Console.RichContent.Components
{
    public class Component
    {
        public virtual Guid Id { get; set; }
        public virtual string Title { get; set; }
        public virtual string Description { get; set; }
        public virtual IEnumerable<string> GroupingTags { get; set; }
        public virtual IEnumerable<string> ContainerClasses { get; set; }
        public virtual IEnumerable<string> AntiTags { get; set; }
        public virtual ComponentImage ComponentImage { get; set; }
        public virtual string ComponentDefinition { get; set; }
    }

    public class ComponentImage
    {
        public string IconName;
        public string CustomImageUri;
    }
}
