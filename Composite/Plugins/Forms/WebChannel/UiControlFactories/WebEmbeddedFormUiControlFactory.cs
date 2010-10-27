using Composite.Core.NewIO;
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


        public WebEmbeddedFormUiControl(IFormChannelIdentifier channel)
        {
            this.UiControlChannel = channel;
        }


        public void InitializeViewState()
        {
            ((IWebUiControl)this.CompiledUiControl).InitializeViewState();
        }


        public Control BuildWebControl()
        {
            Control _formControl = ((IWebUiControl)this.CompiledUiControl).BuildWebControl();


            _formControl.ID = System.IO.Path.GetFileNameWithoutExtension(this.FormPath); ;

            return _formControl;
        }

        public bool IsFullWidthControl { get { return false; } }

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
