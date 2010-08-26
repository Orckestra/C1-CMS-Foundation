using System.Collections.Generic;

using Composite.C1Console.Forms.Foundation;
using System;

namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("Label")]
    internal abstract class ButtonUiControl : UiControl
    {
        private EventHandler _eventHandler;

        [FormsProperty()]
        public EventHandler ClickEventHandler
        {
            get { return _eventHandler; }
            set { _eventHandler = value; }
        }

    }
}
