using System;
using System.Collections.Generic;


namespace Composite.Forms.CoreUiControls
{
    public interface IContainerUiControl : IUiControl
    {
        [FormsProperty()]
        List<IUiControl> UiControls { get; }

        void InitializeLazyBindedControls();
    }
}
