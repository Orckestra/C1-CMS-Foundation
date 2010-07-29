using System;
using System.Collections.Generic;
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
    public abstract class XhtmlEditorTemplateUserControlBase : UserControl
    {
        private string _formControlLabel;
        private string _xhtml;

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

        public string Xhtml
        {
            get { return _xhtml; }
            set { _xhtml = value; }
        }

        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }

        public IEnumerable<Type> EmbedableFieldsTypes { get; set; }

        public string ClassConfigurationName { get; set; }


    }

    internal sealed class TemplatedXhtmlEditorUiControl : XhtmlEditorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private XhtmlEditorTemplateUserControlBase _userControl;

        internal TemplatedXhtmlEditorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.Xhtml = _userControl.Xhtml;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<XhtmlEditorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Xhtml = this.Xhtml;
            _userControl.EmbedableFieldsTypes = this.EmbedableFieldsTypes;
            _userControl.ClassConfigurationName = this.ClassConfigurationName;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return true; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }


    [ConfigurationElementType(typeof(TemplatedXhtmlEditorUiControlFactoryData))]
    internal sealed class TemplatedXhtmlEditorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        private TemplatedXhtmlEditorUiControlFactoryData _data;

        public TemplatedXhtmlEditorUiControlFactory(TemplatedXhtmlEditorUiControlFactoryData data)
            : base(data)
        {
            _data = data;
        }

        public override IUiControl CreateControl()
        {
            TemplatedXhtmlEditorUiControl control = new TemplatedXhtmlEditorUiControl(this.UserControlType);

            control.ClassConfigurationName = _data.ClassConfigurationName;

            return control;
        }
    }

    [Assembler(typeof(TemplatedXhtmlEditorUiControlFactoryAssembler))]
    internal sealed class TemplatedXhtmlEditorUiControlFactoryData : XhtmlEditorUiControlFactoryData, Base.ITemplatedUiControlFactoryData
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

    internal sealed class TemplatedXhtmlEditorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedXhtmlEditorUiControlFactory(objectConfiguration as TemplatedXhtmlEditorUiControlFactoryData);
        }
    }


}
