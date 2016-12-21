using System;
using System.Collections.Generic;
using Composite.C1Console.Forms.Foundation;

namespace Composite.C1Console.Forms.CoreUiControls
{
    internal abstract class MultiContentXhtmlEditorUiControl : UiControl
    {
        [FormsProperty()]
        public Dictionary<string, string> PlaceholderDefinitions { get; set; }

        [FormsProperty()]
        public Dictionary<string, string> PlaceholderContainerClasses { get; set; }

        [FormsProperty()]
        public string DefaultPlaceholderId { get; set; }

        [FormsProperty()]
        [BindableProperty()]
        public Dictionary<string, string> NamedXhtmlFragments { get; set; }

        [FormsProperty()]
        public string ClassConfigurationName { get; set; }

        [FormsProperty()]
        public IEnumerable<Type> EmbedableFieldsTypes { get; set; }
    }

}
