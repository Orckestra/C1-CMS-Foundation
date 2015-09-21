using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.UI;
using Composite.Data.DynamicTypes;
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
    public abstract class TypeFieldDesignerTemplateUserControlBase : UserControl
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
        public IEnumerable<DataFieldDescriptor> Fields { get; set; }

        /// <exclude />
        public string KeyFieldName { get; set; }

        /// <exclude />
        public string LabelFieldName { get; set; }

        /// <exclude />
        public string FormControlLabel { get; set; }

        /// <exclude />
        public bool KeyFieldReadOnly { get; set; }
    }


    internal sealed class TemplatedTypeFieldDesignerUiControl : TypeFieldDesignerUiControl, IWebUiControl
    {
        private readonly Type _userControlType;
        private TypeFieldDesignerTemplateUserControlBase _userControl;

        internal TemplatedTypeFieldDesignerUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.Fields = _userControl.Fields;
            this.KeyFieldName = _userControl.KeyFieldName;
            this.LabelFieldName = _userControl.LabelFieldName;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<TypeFieldDesignerTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Fields = this.Fields;
            _userControl.KeyFieldName = KeyFieldName;
            _userControl.LabelFieldName = this.LabelFieldName;
            _userControl.KeyFieldReadOnly = KeyFieldReadOnly;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return true; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }


    [ConfigurationElementType(typeof(TemplatedTypeFieldDesignerUiControlFactoryData))]
    internal sealed class TemplatedTypeFieldDesignerUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedTypeFieldDesignerUiControlFactory(TemplatedTypeFieldDesignerUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            var control = new TemplatedTypeFieldDesignerUiControl(this.UserControlType);

            return control;
        }
    }


    [Assembler(typeof(TemplatedTypeFieldDesignerUiControlFactoryAssembler))]
    internal sealed class TemplatedTypeFieldDesignerUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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


    internal sealed class TemplatedTypeFieldDesignerUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedTypeFieldDesignerUiControlFactory(objectConfiguration as TemplatedTypeFieldDesignerUiControlFactoryData);
        }
    }


}
