using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Forms.CoreUiControls
{
    public abstract class ToolbarButtonUiControl : ButtonUiControl
	{
        public ToolbarButtonUiControl()
        {
            this.IsDisabled = false;
            this.SaveBehaviour = false;
        }


        [FormsProperty()]
        public string IconHandle { get; set; }

        [FormsProperty()]
        public string DisabledIconHandle { get; set; }

        [FormsProperty()]
        public bool IsDisabled { get; set; }

        [FormsProperty()]
        public string LaunchUrl { get; set; }

        [FormsProperty()]
        public bool SaveBehaviour { get; set; }
    }
}
