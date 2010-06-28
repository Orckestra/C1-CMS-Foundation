using System;
using Composite.Forms.Foundation;

namespace Composite.Forms.CoreUiControls
{
    internal abstract class FunctionCallsDesignerUiControl : UiControl
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
