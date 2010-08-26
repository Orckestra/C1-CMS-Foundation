using System;
using System.Configuration;
using System.Web.UI;
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
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ToolbarButtonTemplateUserControlBase : UserControl
    {
        public EventHandler FormControlClickEventHandler { get; set; }

        public string FormControlLabel { get; set; }

        public string FormControlHelp { get; set; }

        public string FormControlIconHandle { get; set; }

        public string FormControlDisabledIconHandle { get; set; }

        public string FormControlLaunchUrl { get; set; }

        public bool FormControlIsDisabled { get; set; }

        public bool FormControlSaveBehaviour { get; set; }
    }



    internal sealed class TemplatedToolbarButtonUiControl : ToolbarButtonUiControl, IWebUiControl
    {
        private Type _userControlType;

        internal TemplatedToolbarButtonUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public void InitializeViewState()
        {
        }

        public Control BuildWebControl()
        {
            ToolbarButtonTemplateUserControlBase userControl = _userControlType.ActivateAsUserControl<ToolbarButtonTemplateUserControlBase>(this.UiControlID);

            userControl.FormControlLabel = this.Label;
            userControl.FormControlClickEventHandler += this.ClickEventHandler;
            userControl.FormControlHelp = this.Help;
            userControl.FormControlIconHandle = this.IconHandle;
            userControl.FormControlDisabledIconHandle = this.DisabledIconHandle;
            userControl.FormControlLaunchUrl = this.LaunchUrl;
            userControl.FormControlSaveBehaviour = this.SaveBehaviour;
            userControl.FormControlIsDisabled = this.IsDisabled;

            return userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return null; } }
    }


    [ConfigurationElementType(typeof(TemplatedToolbarButtonUiControlFactoryData))]
    internal sealed class TemplatedToolbarButtonUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedToolbarButtonUiControlFactory(TemplatedToolbarButtonUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedToolbarButtonUiControl control = new TemplatedToolbarButtonUiControl(this.UserControlType);

            return control;
        }
    }



    [Assembler(typeof(TemplatedToolbarButtonUiControlFactoryAssembler))]
    internal sealed class TemplatedToolbarButtonUiControlFactoryData : ToolbarButtonUiControlFactoryData, Base.ITemplatedUiControlFactoryData
    {
        private const string _userControlVirtualPathPropertyName = "userControlVirtualPath";
        private const string _cacheCompiledUserControlTypePropertyName = "cacheCompiledUserControlType";

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


    internal sealed class TemplatedToolbarButtonUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedToolbarButtonUiControlFactory(objectConfiguration as TemplatedToolbarButtonUiControlFactoryData);
        }
    }
}
