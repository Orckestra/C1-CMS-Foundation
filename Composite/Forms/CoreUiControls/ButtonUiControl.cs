using System.Collections.Generic;

using Composite.Forms.Foundation;
using System;

namespace Composite.Forms.CoreUiControls
{
    [ControlValueProperty("Label")]
    public abstract class ButtonUiControl : UiControl
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
