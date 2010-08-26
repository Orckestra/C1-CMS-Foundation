using System.Collections.Generic;

using Composite.C1Console.Forms.Foundation;

namespace Composite.C1Console.Forms.CoreUiControls
{
    /// <summary>
    /// Base class for UiControl containers. 
    /// </summary>
    [ControlValueProperty("UiControls")]
    internal abstract class ContainerUiControlBase : UiControl, IContainerUiControl
    {
        public ContainerUiControlBase()
        {
            this.UiControls = new List<IUiControl>();
        }

        /// <summary>
        /// The list of contained UiControls.
        /// </summary>
        [FormsProperty()]
        public List<IUiControl> UiControls { get; private set; }


        public abstract void InitializeLazyBindedControls();
    }
}
