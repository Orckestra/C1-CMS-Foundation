using System.Collections.Generic;
using System.IO;

using Composite.Forms.Foundation;
using Composite.Data.DynamicTypes;


namespace Composite.Forms.CoreUiControls
{
    /// <summary>
    /// Provides editing functionality for DataFieldDescriptor elements
    /// </summary>
    public abstract class TypeFieldDesignerUiControl : UiControl
    {
        /// <summary>
        /// </summary>
        [RequiredValue()]
        [BindableProperty()]
        [FormsProperty()]
        public IEnumerable<DataFieldDescriptor> Fields { get; set; }


        /// <summary>
        /// </summary>
        [RequiredValue()]
        [BindableProperty()]
        [FormsProperty()]
        public string LabelFieldName { get; set; }
    }
}
