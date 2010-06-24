using System;
using System.Globalization;
using System.ComponentModel;


using Composite.Forms.Foundation;
using System.Collections.Generic;

namespace Composite.Forms.CoreUiControls
{
    public abstract class MultiContentXhtmlEditorUiControl : UiControl
    {
        [FormsProperty()]
        public Dictionary<string, string> PlaceholderDefinitions { get; set; }

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
