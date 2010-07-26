using System;
using System.Collections.Generic;
using System.Linq;

using Composite.Forms.Foundation;


namespace Composite.Forms.CoreUiControls
{
    internal class XmlFunctionsDefinitionsEditorUiControl : UiControl
    {
        /// <summary>
        /// List of "CompositeFuntionName" and "Result Name" pairs
        /// </summary>
        [RequiredValue()]
        [BindableProperty()]
        [FormsProperty()]
        public IEnumerable<KeyValuePair<string, string>> XmlFunctions { get; set; }

        /// <summary>
        /// Lookup where "Local name" is key and value is a key value pair
        /// </summary>
        [RequiredValue()]
        [BindableProperty()]
        [FormsProperty()]
        public ILookup<string, KeyValuePair<string, string>> Parameters { get; set; }

        [BindableProperty()]
        [FormsProperty()]
        public string UserProvidedPreviewXml { get; set; }

    }

}
