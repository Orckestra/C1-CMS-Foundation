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
    public abstract class CheckBoxTemplateUserControlBase : UserControl
    {
        private string _formControlLabel;
        private bool _checked;

        protected abstract void BindStateToProperties();

        protected abstract void InitializeViewState();

        public abstract string GetDataFieldClientName();

        internal void BindStateToControlProperties()
        {
            this.BindStateToProperties();
        }

        internal void InitializeWebViewState()
        {
            this.InitializeViewState();
        }

        public bool Checked
        {
            get { return _checked; }
            set { _checked = value; }
        }

        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }


        public string ItemLabel { get; set; }
    }

    internal sealed class TemplatedCheckBoxUiControl : CheckBoxUiControl, IWebUiControl
    {
        private Type _userControlType;
        private CheckBoxTemplateUserControlBase _userControl;

        internal TemplatedCheckBoxUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.Checked = _userControl.Checked;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<CheckBoxTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Checked = this.Checked;
            _userControl.ItemLabel = this.ItemLabel;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }



    [ConfigurationElementType(typeof(TemplatedCheckBoxUiControlFactoryData))]
    internal sealed class TemplatedCheckBoxUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedCheckBoxUiControlFactory(TemplatedCheckBoxUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedCheckBoxUiControl control = new TemplatedCheckBoxUiControl(this.UserControlType);

            return control;
        }
    }

    [Assembler(typeof(TemplatedCheckBoxUiControlFactoryAssembler))]
    internal sealed class TemplatedCheckBoxUiControlFactoryData : CheckBoxUiControlFactoryData, Base.ITemplatedUiControlFactoryData
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

    internal sealed class TemplatedCheckBoxUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedCheckBoxUiControlFactory(objectConfiguration as TemplatedCheckBoxUiControlFactoryData);
        }
    }


}
