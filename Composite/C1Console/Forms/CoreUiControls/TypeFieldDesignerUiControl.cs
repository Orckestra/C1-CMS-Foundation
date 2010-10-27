using System.Collections.Generic;
using Composite.Core.NewIO;

using Composite.C1Console.Forms.Foundation;
using Composite.Data.DynamicTypes;


namespace Composite.C1Console.Forms.CoreUiControls
{
    /// <summary>
    /// Provides editing functionality for DataFieldDescriptor elements
    /// </summary>
    internal abstract class TypeFieldDesignerUiControl : UiControl
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
