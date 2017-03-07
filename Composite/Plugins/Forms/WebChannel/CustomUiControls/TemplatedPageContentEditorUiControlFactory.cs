using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.UI;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.Foundation;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core.WebClient;
using Composite.Plugins.Forms.WebChannel.Foundation;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Forms.WebChannel.CustomUiControls
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class PageContentEditorTemplateUserControlBase : UserControl
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
        public Guid PageId { get; set; }

        /// <exclude />
        public Guid TemplateId { get; set; }

        /// <exclude />
        public List<KeyValuePair<Guid, string>> SelectableTemplateIds { get; set; }

        /// <exclude />
        public Dictionary<string, string> NamedXhtmlFragments { get; set; }

        /// <exclude />
        public string FormControlLabel { get; set; }

        /// <exclude />
        public string ClassConfigurationName { get; set; }

        /// <exclude />
        public Guid PageTypeId { get; set; }
    }

    internal sealed class TemplatedPageContentEditorUiControl : UiControl, IWebUiControl
    {
        [FormsProperty()]
        [BindableProperty()]
        public Guid PageId { get; set; }

        [FormsProperty()]
        [BindableProperty()]
        public Guid TemplateId { get; set; }

        [FormsProperty()]
        [BindableProperty()]
        public List<KeyValuePair<Guid, string>> SelectableTemplateIds { get; set; }

        [FormsProperty()]
        [BindableProperty()]
        public Dictionary<string, string> NamedXhtmlFragments { get; set; }

        [FormsProperty()]
        public string ClassConfigurationName { get; set; }

        [FormsProperty()]
        public Guid PageTypeId { get; set; }

        private Type _userControlType;
        private PageContentEditorTemplateUserControlBase _userControl;

        internal TemplatedPageContentEditorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
            this.SelectableTemplateIds = new List<KeyValuePair<Guid, string>>();
            this.NamedXhtmlFragments = new Dictionary<string, string>();
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.SelectableTemplateIds = new List<KeyValuePair<Guid, string>>();
            this.NamedXhtmlFragments = _userControl.NamedXhtmlFragments;
            this.TemplateId = _userControl.TemplateId;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<PageContentEditorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.TemplateId = this.TemplateId;
            _userControl.SelectableTemplateIds = this.SelectableTemplateIds;
            _userControl.NamedXhtmlFragments = this.NamedXhtmlFragments;
            _userControl.ClassConfigurationName = this.ClassConfigurationName;
            _userControl.PageId = this.PageId;
            _userControl.PageTypeId = this.PageTypeId;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return true; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }



    [ConfigurationElementType(typeof(TemplatedPageContentEditorUiControlFactoryData))]
    internal sealed class TemplatedPageContentEditorUiControlFactory : IUiControlFactory
    {
        private TemplatedPageContentEditorUiControlFactoryData _data;
        private Type _cachedUserControlType = null;

        public TemplatedPageContentEditorUiControlFactory(TemplatedPageContentEditorUiControlFactoryData data)
        {
            _data = data;

            if (_data.CacheCompiledUserControlType)
            {
                _cachedUserControlType = BuildManagerHelper.GetCompiledType(_data.UserControlVirtualPath);
            }
        }

        public IUiControl CreateControl()
        {
            Type userControlType = _cachedUserControlType;

            if (userControlType == null && System.Web.HttpContext.Current != null)
            {
                userControlType = BuildManagerHelper.GetCompiledType(_data.UserControlVirtualPath);
            }

            TemplatedPageContentEditorUiControl control = new TemplatedPageContentEditorUiControl(userControlType);

            control.ClassConfigurationName = _data.ClassConfigurationName;

            return control;
        }
    }

    [Assembler(typeof(TemplatedPageContentEditorUiControlFactoryAssembler))]
    internal sealed class TemplatedPageContentEditorUiControlFactoryData : UiControlFactoryData
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

        private const string _classConfigurationNamePropertyName = "ClassConfigurationName";
        [ConfigurationProperty(_classConfigurationNamePropertyName, IsRequired = false, DefaultValue = "common")]
        public string ClassConfigurationName
        {
            get { return (string)base[_classConfigurationNamePropertyName]; }
            set { base[_classConfigurationNamePropertyName] = value; }
        }

    }

    internal sealed class TemplatedPageContentEditorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedPageContentEditorUiControlFactory(objectConfiguration as TemplatedPageContentEditorUiControlFactoryData);
        }
    }


}
