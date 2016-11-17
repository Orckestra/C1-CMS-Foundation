using System.Collections.Generic;
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
        [RequiredValue]
        [BindableProperty]
        [FormsProperty]
        public IEnumerable<DataFieldDescriptor> Fields { get; set; }


        /// <summary>
        /// </summary>
        [RequiredValue]
        [BindableProperty]
        [FormsProperty]
        public string LabelFieldName { get; set; }


        /// <summary>
        /// When <value>true</value>, the type selector for a key field will be disabled.
        /// </summary>
        [BindableProperty]
        [FormsProperty]
        public bool KeyFieldReadOnly { get; set; }


        [BindableProperty]
        [FormsProperty]
        public string KeyFieldName { get; set; }


        [FormsProperty]
        public bool IsSearchable { get; set; }
    }
}
