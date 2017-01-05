using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.UI;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Composite.C1Console.RichContent.ContainerClasses;
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
    public abstract class XhtmlEditorTemplateUserControlBase : UserControl
    {
        private string _formControlLabel;
        private string _xhtml;

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
        public string Xhtml
        {
            get { return _xhtml; }
            set { _xhtml = value; }
        }

        /// <exclude />
        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }

        /// <exclude />
        public IEnumerable<Type> EmbedableFieldsTypes { get; set; }

        /// <exclude />
        public string ClassConfigurationName { get; set; }

        /// <exclude />
        public string ContainerClasses { get; set; }

        /// <exclude />
        public Guid PreviewPageId { get; set; }

        /// <exclude />
        public Guid PreviewTemplateId { get; set; }

        /// <exclude />
        public string PreviewPlaceholder { get; set; }

    }

    internal sealed class TemplatedXhtmlEditorUiControl : XhtmlEditorUiControl, IWebUiControl
    {
        private readonly Type _userControlType;
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
            _userControl.ContainerClasses = ContainerClassManager.NormalizeClassNamesString(this.ContainerClasses); 
            _userControl.PreviewPageId = PreviewPageId;
            _userControl.PreviewTemplateId = PreviewTemplateId;
            _userControl.PreviewPlaceholder = PreviewPlaceholder;

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
            control.ContainerClasses = _data.ContainerClasses;

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
