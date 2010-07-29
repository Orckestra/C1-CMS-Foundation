using System;
using System.Configuration;
using System.Web.UI;
using Composite.Forms;
using Composite.Forms.CoreUiControls;
using Composite.Forms.Plugins.UiControlFactory;
using Composite.Forms.WebChannel;
using Composite.StandardPlugins.Forms.WebChannel.Foundation;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.StandardPlugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class HeadingTemplateUserControlBase : UserControl
    {
        private string _formControlLabel;

        protected abstract void InitializeViewState();

        internal void InitializeWebViewState()
        {
            this.InitializeViewState();
        }

        public string Title { get; set; }

        public string Description { get; set; }

        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }

    }

    internal sealed class TemplatedHeadingUiControl : HeadingUiControl, IWebUiControl
    {
        private Type _userControlType;
        private HeadingTemplateUserControlBase _userControl;

        internal TemplatedHeadingUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<HeadingTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Title = this.Title;
            _userControl.Description = this.Description;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return null; } }
    }


    [ConfigurationElementType(typeof(TemplatedHeadingUiControlFactoryData))]
    internal sealed class TemplatedHeadingUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedHeadingUiControlFactory(TemplatedHeadingUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedHeadingUiControl control = new TemplatedHeadingUiControl(this.UserControlType);

            return control;
        }
    }


    [Assembler(typeof(TemplatedHeadingUiControlFactoryAssembler))]
    internal sealed class TemplatedHeadingUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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

    internal sealed class TemplatedHeadingUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext conHeading, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedHeadingUiControlFactory(objectConfiguration as TemplatedHeadingUiControlFactoryData);
        }
    }
}
