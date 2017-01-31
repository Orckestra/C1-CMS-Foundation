using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Web.UI;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Composite.Plugins.Forms.WebChannel.Foundation;
using Composite.Data.Validation.ClientValidationRules;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public abstract class TextInputTemplateUserControlBase : UserControl, IPostBackDataHandler
    {
        /// <exclude />
        protected abstract void BindStateToProperties();

        /// <exclude />
        protected abstract void InitializeViewState();

        /// <exclude />
        public abstract string GetDataFieldClientName();

        internal void BindStateToControlProperties()
        {
            this.BindStateToProperties();
        }

        internal void InitializeWebViewState()
        {
            this.InitializeViewState();
        }

        /// <exclude />
        public string Text { get; set; }

        /// <exclude />
        public string FormControlLabel { get; set; }

        /// <exclude />
        public bool Required
        {
            get; set;
        }

        /// <exclude />
        public bool SpellCheck { get; set; } = true;

        /// <exclude />
        public List<ClientValidationRule> ClientValidationRules { get; set; }

        /// <exclude />
        public TextBoxType Type { get; set; }


        /// <summary>
        /// When implemented by a class, processes postback data for an ASP.NET server control.
        /// </summary>
        /// <param name="postDataKey"></param>
        /// <param name="postCollection"></param>
        /// <returns></returns>
        public virtual bool LoadPostData(string postDataKey, NameValueCollection postCollection)
        {
            return false;
        }

        /// <summary>
        /// When implemented by a class, signals the server control to notify the ASP.NET application that the state of the control has changed.
        /// </summary>
        public virtual void RaisePostDataChangedEvent()
        {
        }
    }



    internal sealed class TemplatedTextInputUiControl : TextInputUiControl, IWebUiControl
    {
        private readonly Type _userControlType;
        private TextInputTemplateUserControlBase _userControl;

        internal TemplatedTextInputUiControl(Type userControlType)
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
            _userControl = _userControlType.ActivateAsUserControl<TextInputTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Text = this.Text;
            _userControl.ClientValidationRules = this.ClientValidationRules;
            _userControl.Type = this.Type;
            _userControl.Required = this.Required;
            _userControl.SpellCheck = this.SpellCheck;

            return _userControl;
        }

        public bool IsFullWidthControl => false;

        public string ClientName => _userControl.GetDataFieldClientName();
    }



    [ConfigurationElementType(typeof(TemplatedTextInputUiControlFactoryData))]
    internal sealed class TemplatedTextInputUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedTextInputUiControlFactory(TemplatedTextInputUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            var control = new TemplatedTextInputUiControl(this.UserControlType);

            return control;
        }
    }



    [Assembler(typeof(TemplatedTextInputUiControlFactoryAssembler))]
    internal sealed class TemplatedTextInputUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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



    internal sealed class TemplatedTextInputUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedTextInputUiControlFactory(objectConfiguration as TemplatedTextInputUiControlFactoryData);
        }
    }
}
