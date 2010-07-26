using System;
using System.Collections.Generic;


namespace Composite.Forms.CoreUiControls
{
    internal interface IContainerUiControl : IUiControl
    {
        [FormsProperty()]
        List<IUiControl> UiControls { get; }

        void InitializeLazyBindedControls();
    }
}
