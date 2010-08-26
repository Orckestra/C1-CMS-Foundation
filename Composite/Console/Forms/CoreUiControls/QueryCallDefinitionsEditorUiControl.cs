using System;
using System.Collections.Generic;
using System.Linq;

using Composite.C1Console.Forms.Foundation;


namespace Composite.C1Console.Forms.CoreUiControls
{
    internal class QueryCallDefinitionsEditorUiControl : UiControl
    {
        /// <summary>
        /// List of "Local name" and "Query Id" elements
        /// </summary>
        [BindableProperty()]
        [FormsProperty()]
        public IEnumerable<KeyValuePair<string, Guid>> Queries { get; set; }


        /// <summary>
        /// Lookup where "Local name" is key and value is a key value pair
        /// </summary>
        [BindableProperty()]
        [FormsProperty()]
        public ILookup<string, KeyValuePair<string, string>> Parameters { get; set; }


        [BindableProperty()]
        [FormsProperty()]
        public string UserProvidedPreviewXml { get; set; }

    }

}
