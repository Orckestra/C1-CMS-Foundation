using System.Web.UI;
using System.Web.UI.WebControls;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{
    internal sealed class WebDebugUiControl : DebugUiControl, IWebUiControl
    {
        private Panel _panel;

        public Control BuildWebControl()
        {
            _panel = new Panel();

            _panel.CssClass = "debugPanel";

            Label xpathLabel = new Label();
            xpathLabel.Text = string.Format("XPath: {0}", this.SourceElementXPath);
            xpathLabel.CssClass = "debugPanelHeader";
            AddControl(xpathLabel);

            Control control = (this.UiControl as IWebUiControl).BuildWebControl();

            AddControl(control);


            return _panel;
        }

        public void InitializeViewState()
        {
            (this.UiControl as IWebUiControl).InitializeViewState();
        }

        private void AddControl(Control control)
        {
            _panel.Controls.Add(control);

        }

        public override void BindStateToControlProperties()
        {
            this.UiControl.BindStateToControlProperties();
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return null; } }
    }


    [ConfigurationElementType(typeof(WebDebugUiControlFactoryData))]
    internal sealed class WebDebugUiControlFactory : IUiControlFactory
    {
        public IUiControl CreateControl()
        {
            return new WebDebugUiControl();
        }
    }


    [Assembler(typeof(WebDebugUiControlFactoryAssembler))]
    internal sealed class WebDebugUiControlFactoryData : DebugUiControlFactoryData
    {
    }


    internal sealed class WebDebugUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new WebDebugUiControlFactory();
        }
    }
}
