using System;
using System.Collections.Generic;


namespace Composite.C1Console.Forms.CoreUiControls
{
    internal interface IContainerUiControl : IUiControl
    {
        [FormsProperty()]
        List<IUiControl> UiControls { get; }

        void InitializeLazyBindedControls();
    }
}
