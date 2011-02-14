using System.IO;
using System.Web.UI;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.DataServices.UiControls;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Composite.C1Console.Forms.ControlValueProperty("Bindings")]
    public class WebEmbeddedFormUiControl : EmbeddedFormUiControl, IWebUiControl
    {
        internal WebEmbeddedFormUiControl()
        { }



        /// <exclude />
        public WebEmbeddedFormUiControl(IFormChannelIdentifier channel)
        {
            this.UiControlChannel = channel;
        }


        /// <exclude />
        public void InitializeViewState()
        {
            ((IWebUiControl)this.CompiledUiControl).InitializeViewState();
        }


        /// <exclude />
        public Control BuildWebControl()
        {
            Control _formControl = ((IWebUiControl)this.CompiledUiControl).BuildWebControl();


            _formControl.ID = Path.GetFileNameWithoutExtension(this.FormPath); ;

            return _formControl;
        }


        /// <exclude />
        public bool IsFullWidthControl { get { return false; } }


        /// <exclude />
        public string ClientName { get { return null; } }
    }



    [ConfigurationElementType(typeof(WebEmbeddedFormUiControlFactoryData))]
    internal sealed class WebEmbeddedFormUiControlFactory : IUiControlFactory
    {
        public IUiControl CreateControl()
        {
            return new WebEmbeddedFormUiControl();
        }
    }



    [Assembler(typeof(NonConfigurableUiControlFactoryAssembler))]
    internal sealed class WebEmbeddedFormUiControlFactoryData : UiControlFactoryData
    {
        
    }
}
