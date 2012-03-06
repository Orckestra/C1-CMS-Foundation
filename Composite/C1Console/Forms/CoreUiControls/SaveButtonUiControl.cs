using System.Collections.Generic;

using Composite.C1Console.Forms.Foundation;
using System;

namespace Composite.C1Console.Forms.CoreUiControls
{
    [ControlValueProperty("Label")]
    internal abstract class SaveButtonUiControl : UiControl
    {
        private EventHandler _saveEventHandler;
        private EventHandler _saveAndPublishEventHandler;

        [FormsProperty()]
        public EventHandler SaveEventHandler
        {
            get { return _saveEventHandler; }
            set { _saveEventHandler = value; }
        }


        [FormsProperty()]
        public EventHandler SaveAndPublishEventHandler
        {
            get { return _saveAndPublishEventHandler; }
            set { _saveAndPublishEventHandler = value; }
        }
    }
}
