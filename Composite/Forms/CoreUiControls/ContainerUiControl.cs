using System.Collections.Generic;

using Composite.Forms.Foundation;

namespace Composite.Forms.CoreUiControls
{
    /// <summary>
    /// Base class for UiControl containers. 
    /// </summary>
    [ControlValueProperty("UiControls")]
    public abstract class ContainerUiControlBase : UiControl, IContainerUiControl
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
