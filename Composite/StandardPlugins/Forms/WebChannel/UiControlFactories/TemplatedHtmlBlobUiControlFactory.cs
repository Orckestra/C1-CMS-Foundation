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
    public abstract class HtmlBlobTemplateUserControlBase : UserControl
    {
        private string _html;

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

        public string Html
        {
            get { return _html; }
            set { _html = value; }
        }
    }



    internal sealed class TemplatedHtmlBlobUiControl : HtmlBlobUiControl, IWebUiControl
    {
        private Type _userControlType;
        private HtmlBlobTemplateUserControlBase _userControl;


        internal TemplatedHtmlBlobUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }


        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.Html = _userControl.Html;
        }


        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<HtmlBlobTemplateUserControlBase>(this.UiControlID);

            _userControl.Html = this.Html;

            return _userControl;
        }


        public bool IsFullWidthControl { get { return true; } }


        public string ClientName { get { return null; } }
    }


    [ConfigurationElementType(typeof(TemplatedHtmlBlobUiControlFactoryData))]
    internal sealed class TemplatedHtmlBlobUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedHtmlBlobUiControlFactory(TemplatedHtmlBlobUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedHtmlBlobUiControl control = new TemplatedHtmlBlobUiControl(this.UserControlType);

            return control;
        }
    }



    [Assembler(typeof(TemplatedHtmlBlobUiControlFactoryAssembler))]
    internal sealed class TemplatedHtmlBlobUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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



    internal sealed class TemplatedHtmlBlobUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedHtmlBlobUiControlFactory(objectConfiguration as TemplatedHtmlBlobUiControlFactoryData);
        }
    }
}
