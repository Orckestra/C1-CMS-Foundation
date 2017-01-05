using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.UI;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Composite.Core.WebClient;
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
    public abstract class MultiContentXhtmlEditorTemplateUserControlBase : UserControl
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
        public string DefaultPlaceholderId { get; set; }

        /// <exclude />
        public Dictionary<string, string> PlaceholderDefinitions { get; set; }
        /// <exclude />
        public Dictionary<string, string> PlaceholderContainerClasses { get; set; }

        /// <exclude />
        public Dictionary<string,string> NamedXhtmlFragments { get; set; }

        /// <exclude />
        public string FormControlLabel { get; set; }

        /// <exclude />
        public IEnumerable<Type> EmbedableFieldsTypes { get; set; }

        /// <exclude />
        public string ClassConfigurationName { get; set; }
    }

    internal sealed class TemplatedMultiContentXhtmlEditorUiControl : MultiContentXhtmlEditorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private MultiContentXhtmlEditorTemplateUserControlBase _userControl;

        internal TemplatedMultiContentXhtmlEditorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
            this.NamedXhtmlFragments = new Dictionary<string, string>();
            this.PlaceholderDefinitions = new Dictionary<string, string>();
            this.PlaceholderContainerClasses = new Dictionary<string, string>();
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.NamedXhtmlFragments = _userControl.NamedXhtmlFragments;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<MultiContentXhtmlEditorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.EmbedableFieldsTypes = this.EmbedableFieldsTypes;
            _userControl.DefaultPlaceholderId = this.DefaultPlaceholderId;
            _userControl.PlaceholderDefinitions = this.PlaceholderDefinitions;
            _userControl.PlaceholderContainerClasses = this.PlaceholderContainerClasses;
            _userControl.NamedXhtmlFragments = this.NamedXhtmlFragments;
            _userControl.ClassConfigurationName = this.ClassConfigurationName;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return true; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }



    [ConfigurationElementType(typeof(TemplatedMultiContentXhtmlEditorUiControlFactoryData))]
    internal sealed class TemplatedMultiContentXhtmlEditorUiControlFactory : IUiControlFactory
    {
        private TemplatedMultiContentXhtmlEditorUiControlFactoryData _data;
        private Type _cachedUserControlType = null;

        public TemplatedMultiContentXhtmlEditorUiControlFactory(TemplatedMultiContentXhtmlEditorUiControlFactoryData data)
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

            if (userControlType == null && System.Web.HttpContext.Current!=null)
            {
                userControlType = BuildManagerHelper.GetCompiledType(_data.UserControlVirtualPath);
            }

            TemplatedMultiContentXhtmlEditorUiControl control = new TemplatedMultiContentXhtmlEditorUiControl(userControlType);

            control.ClassConfigurationName = _data.ClassConfigurationName;

            return control;
        }
    }

    [Assembler(typeof(TemplatedMultiContentXhtmlEditorUiControlFactoryAssembler))]
    internal sealed class TemplatedMultiContentXhtmlEditorUiControlFactoryData : UiControlFactoryData
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

    internal sealed class TemplatedMultiContentXhtmlEditorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedMultiContentXhtmlEditorUiControlFactory(objectConfiguration as TemplatedMultiContentXhtmlEditorUiControlFactoryData);
        }
    }


}
