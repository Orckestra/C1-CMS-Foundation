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
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class TreeSelectorTemplateUserControlBase : UserControl, IPostBackDataHandler
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
        public string SelectedKey { get; set; }

        /// <exclude />
        public string ElementProvider { get; set; }

        /// <exclude />
        public string SelectableElementPropertyName { get; set; }

        /// <exclude />
        public string SelectableElementPropertyValue { get; set; }

        /// <exclude />
        public string SelectableElementReturnValue { get; set; }

        /// <exclude />
        public string SerializedSearchToken { get; set; }

        /// <exclude />
        public bool Required { get; set; }

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



    internal sealed class TemplatedTreeSelectorUiControl : TreeSelectorUiControl, IWebUiControl
    {
        private readonly Type _userControlType;
        private TreeSelectorTemplateUserControlBase _userControl;

        internal TemplatedTreeSelectorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();

            this.SelectedKey = _userControl.SelectedKey;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<TreeSelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.SelectedKey = this.SelectedKey;
            _userControl.ElementProvider = this.ElementProvider;
            _userControl.SelectableElementReturnValue = this.SelectableElementReturnValue;
            _userControl.SelectableElementPropertyName = string.IsNullOrEmpty(this.SelectableElementPropertyName) ? this.SelectableElementReturnValue : this.SelectableElementPropertyName;
            _userControl.SelectableElementPropertyValue = this.SelectableElementPropertyValue;
            _userControl.SerializedSearchToken = this.SerializedSearchToken;
            _userControl.Required = this.Required;

            return _userControl;
        }

        public bool IsFullWidthControl => false;

        public string ClientName => _userControl.GetDataFieldClientName();
    }



    [ConfigurationElementType(typeof(TemplatedTreeSelectorUiControlFactoryData))]
    internal sealed class TemplatedTreeSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedTreeSelectorUiControlFactory(TemplatedTreeSelectorUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            var control = new TemplatedTreeSelectorUiControl(this.UserControlType);

            return control;
        }
    }



    [Assembler(typeof(TemplatedTreeSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedTreeSelectorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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



    internal sealed class TemplatedTreeSelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedTreeSelectorUiControlFactory(
                objectConfiguration as TemplatedTreeSelectorUiControlFactoryData);
        }
    }
}
