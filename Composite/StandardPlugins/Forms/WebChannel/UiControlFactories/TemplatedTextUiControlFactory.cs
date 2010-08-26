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
    public abstract class TextTemplateUserControlBase : UserControl
    {
        private string _formControlLabel;
        private string _text;

        protected abstract void BindStateToProperties();

        protected abstract void InitializeViewState();

        internal void BindStateToControlProperties()
        {
            this.BindStateToProperties();
        }

        internal void InitializeWebViewState()
        {
            this.InitializeViewState();
        }

        public string Text
        {
            get { return _text; }
            set { _text = value; }
        }

        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }

    }

    internal sealed class TemplatedTextUiControl : TextUiControl, IWebUiControl
    {
        private Type _userControlType;
        private TextTemplateUserControlBase _userControl;

        internal TemplatedTextUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.Text = _userControl.Text;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<TextTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Text = this.Text;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return null; } }
    }


    [ConfigurationElementType(typeof(TemplatedTextUiControlFactoryData))]
    internal sealed class TemplatedTextUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedTextUiControlFactory(TemplatedTextUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedTextUiControl control = new TemplatedTextUiControl(this.UserControlType);

            return control;
        }
    }


    [Assembler(typeof(TemplatedTextUiControlFactoryAssembler))]
    internal sealed class TemplatedTextUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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

    internal sealed class TemplatedTextUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedTextUiControlFactory(objectConfiguration as TemplatedTextUiControlFactoryData);
        }
    }
}
