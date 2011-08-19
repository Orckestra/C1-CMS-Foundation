using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.C1Console.Forms
{
    /// <summary>
    /// UiControls can be in a situation where user input can not be converted to the type the control is binding to. 
    /// Rather than throwing an exception, the control can declare that is is in an invalid state and give a message. 
    /// This allow the core to abort saving etc. 
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public interface IValidatingUiControl : IUiControl
    {
        /// <summary>
        /// This field declare is your control is in a valid state. 
        /// If this returns true, actions like Save and Preview will be canceled.
        /// </summary>
        bool IsValid { get; }

        /// <summary>
        /// When in an invalid state this field is expected to describe the reason for this invalid state. The text is intended
        /// for the end-user and should explain what they did wrong, like "Date format is invalid, use 'yyyy-mm-dd'".
        /// </summary>
        string ValidationError { get; }
    }
}
