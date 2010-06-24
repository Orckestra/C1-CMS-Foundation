using System;
using Composite.Forms.Foundation;

namespace Composite.Forms.CoreUiControls
{
    public abstract class FunctionParameterDesignerUiControl : UiControl
    {
        /// <summary>
        /// </summary>
        [RequiredValue]
        [FormsProperty]
        public abstract string SessionStateProvider { get; set; }


        /// <summary>
        /// </summary>
        [RequiredValue]
        [FormsProperty]
        public abstract Guid SessionStateId { get; set; }
    }
}
