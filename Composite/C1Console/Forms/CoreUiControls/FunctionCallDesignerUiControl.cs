using System;
using Composite.C1Console.Forms.Foundation;

namespace Composite.C1Console.Forms.CoreUiControls
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
