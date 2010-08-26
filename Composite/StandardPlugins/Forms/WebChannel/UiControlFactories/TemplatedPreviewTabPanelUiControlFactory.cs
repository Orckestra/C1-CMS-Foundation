using System;
using System.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Composite.Plugins.Forms.WebChannel.Foundation;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>
    /// Use this as base type for User Controls that render a Forms UiControl PreviewTabPanel.
    /// Access details about child elements through the FormControlDefinitions property.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class PreviewTabPanelTemplateUserControlBase : UserControl, IClickableTabPanelControl
    {
        private string _formControlLabel;
        private EventHandler _clickEventHandler;

        public EventHandler FormControlClickEventHandler
        {
            get { return _clickEventHandler; }
            set { _clickEventHandler = value; }
        }

        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }

        public string CustomTabId { get; set; }

        public Control EventControl  { get; set; }
    }


    internal sealed class TemplatedPreviewTabPanelUiControl : ButtonUiControl, IWebUiControl
    {
        private Type _userControlType;
        private string _clientTabId;

        internal TemplatedPreviewTabPanelUiControl(Type userControlType, string clientTabId)
        {
            _userControlType = userControlType;
            _clientTabId = clientTabId;
        }

        public void InitializeViewState()
        {
        }

        public Control BuildWebControl()
        {
            PreviewTabPanelTemplateUserControlBase userControl = _userControlType.ActivateAsUserControl<PreviewTabPanelTemplateUserControlBase>(this.UiControlID);

            userControl.FormControlLabel = this.Label;
            userControl.FormControlClickEventHandler += this.ClickEventHandler;
            userControl.CustomTabId = _clientTabId;
            LinkButton shadowLinkButton = new LinkButton();
            shadowLinkButton.Style.Add( "display", "none" );
            shadowLinkButton.ID = "Preview";
            shadowLinkButton.Text = "Preview";
            shadowLinkButton.Click += this.ClickEventHandler;
            userControl.EventControl = shadowLinkButton;

            return userControl;
        }

        public bool IsFullWidthControl { get { return true; } }

        public string ClientName { get { return null; } }
    }



    [ConfigurationElementType(typeof(TemplatedPreviewTabPanelUiControlFactoryData))]
    internal sealed class TemplatedPreviewTabPanelUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        private TemplatedPreviewTabPanelUiControlFactoryData _data;

        public TemplatedPreviewTabPanelUiControlFactory(TemplatedPreviewTabPanelUiControlFactoryData data)
            : base(data)
        {
            _data = data;
        }

        public override IUiControl CreateControl()
        {
            TemplatedPreviewTabPanelUiControl control = new TemplatedPreviewTabPanelUiControl(this.UserControlType,_data.ClientTabId);

            return control;
        }
    }



    [Assembler(typeof(TemplatedPreviewTabPanelUiControlFactoryAssembler))]
    internal sealed class TemplatedPreviewTabPanelUiControlFactoryData : ButtonUiControlFactoryData, Base.ITemplatedUiControlFactoryData
    {
        private const string _userControlVirtualPathPropertyName = "userControlVirtualPath";
        private const string _clientTabIdPropertyName = "ClientTabId";
        private const string _cacheCompiledUserControlTypePropertyName = "cacheCompiledUserControlType";

        [ConfigurationProperty(_clientTabIdPropertyName, IsRequired = true)]
        public string ClientTabId
        {
            get { return (string)base[_clientTabIdPropertyName]; }
            set { base[_clientTabIdPropertyName] = value; }
        }

        [ConfigurationProperty(_userControlVirtualPathPropertyName, IsRequired = true)]
        public string UserControlVirtualPath
        {
            get { return (string)base[_userControlVirtualPathPropertyName]; }
            set { base[_userControlVirtualPathPropertyName] = value; }
        }

        [ConfigurationProperty(_cacheCompiledUserControlTypePropertyName, IsRequired = false, DefaultValue = true)]
        public bool CacheCompiledUserControlType
        {
            get { return (bool)base[_cacheCompiledUserControlTypePropertyName]; }
            set { base[_cacheCompiledUserControlTypePropertyName] = value; }
        }
    }


    internal sealed class TemplatedPreviewTabPanelUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedPreviewTabPanelUiControlFactory(objectConfiguration as TemplatedPreviewTabPanelUiControlFactoryData);
        }
    }


}
