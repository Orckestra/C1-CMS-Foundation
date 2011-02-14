using System.Collections.Generic;
using Composite.Data.Validation.ClientValidationRules;


namespace Composite.C1Console.Forms.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class UiControl : IUiControl
    {
        private string _label = "";
        private string _help = "";


        /// <exclude />
        public UiControl()
        {
            this.SourceBindingPaths = new List<string>();
        }

        /// <summary>
        /// The unique and permanent ID of the UiControl instance.
        /// </summary>
        public string UiControlID { get; set; }

        /// <summary>
        /// The channel name of the UiControl instance.
        /// </summary>
        public IFormChannelIdentifier UiControlChannel { get; set; }

        /// <summary>
        /// The label of the UiControl. Containers may use this value when applying layout to a list of UiControls.
        /// </summary>
        [FormsProperty()]
        public virtual string Label
        {
            get { return _label; }
            set { _label = value; }
        }

        /// <summary>
        /// Short context sensitive help relevant to the control.
        /// </summary>
        [FormsProperty()]
        public virtual string Help
        {
            get { return _help; }
            set { _help = value; }
        }


        /// <exclude />
        public List<ClientValidationRule> ClientValidationRules
        {
            get;
            set;
        }

        /// <summary>
        /// When invoked, UiControl Properies that expose bindable data must be updated to reflect user induced state.
        /// I.e. the Text property of a TextBox UiControl should be assigned the Text property of it's inner control, so
        /// the Composite.C1Console.Forms Manager can access the users input. 
        /// </summary>
        public virtual void BindStateToControlProperties()
        { }


        /// <summary>
        /// A (short) message to the user relating to this control, typically information about missing or 
        /// bad input.
        /// </summary>
        public List<string> SourceBindingPaths { get; set; }

    }
}
