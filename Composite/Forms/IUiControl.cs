using Composite.Validation.ClientValidationRules;
using System.Collections.Generic;


namespace Composite.Forms
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IUiControl
    {
        /// <summary>
        /// UiControls are automatically assigned a unique and permanent UiControlID by the Composite.Forms Manager. 
        /// Use the UiControlID to uniquely identify a UiControl instance between build ups.
        /// </summary>
        string UiControlID { get; set; }

        /// <summary>
        /// UiControls are automatically assigned the name of the channel they are executed within. 
        /// You can use the channel name when compiling embedded forms.
        /// </summary>
        IFormChannelIdentifier UiControlChannel { get; set; }

        /// <summary>
        /// UiControl labels are used by most containers to label the control.
        /// </summary>
        string Label { get; set; }

        /// <summary>
        /// UiControl help strings are used by most containers to add context sensitive help to the control.
        /// </summary>
        string Help { get; set; }

        /// <summary>
        /// UiControls can use these validation rules to perform client side validaion
        /// </summary>
        List<ClientValidationRule> ClientValidationRules { get; set; }

        /// <summary>
        /// When invoked, UiControl Properies that expose bindable data must be updated to reflect user induced state.
        /// I.e. the Text property of a TextBox UiControl should be assigned the Text property of it's inner control, so
        /// the Composite.Forms Manager can access the users input. 
        /// </summary>
        void BindStateToControlProperties();

        /// <summary>
        /// The "path to the source" that is bound to this control - i.e. the value written in the "source" property in the form markup.
        /// </summary>
        List<string> SourceBindingPaths { get; set; }
    }
}
