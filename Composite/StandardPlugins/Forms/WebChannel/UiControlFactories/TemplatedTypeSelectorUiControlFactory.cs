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
    public abstract class TypeSelectorTemplateUserControlBase : UserControl
    {
        private string _formControlLabel;
        private Type _selectedType;
        private TemplatedTypeSelectorUiControl _typeOptionsProxy;

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

        internal void SetTypeOptionsProxy(TemplatedTypeSelectorUiControl proxy)
        {
            _typeOptionsProxy = proxy;
        }

        public Type SelectedType
        {
            get { return _selectedType; }
            set { _selectedType = value; }
        }

        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }

        public IEnumerable<Type> TypeOptions 
        {
            get
            {
                return _typeOptionsProxy.FetchTypeOptions();
            }
        }

    }

    internal sealed class TemplatedTypeSelectorUiControl : TypeSelectorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private TypeSelectorTemplateUserControlBase _userControl;


        internal TemplatedTypeSelectorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }


        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.SelectedType = _userControl.SelectedType;
        }


        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<TypeSelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.SelectedType = this.SelectedType;
            _userControl.SetTypeOptionsProxy(this);

            return _userControl;
        }


        internal IEnumerable<Type> FetchTypeOptions()
        {
            return base.GetTypeOptions();
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }



    [ConfigurationElementType(typeof(TemplatedTypeSelectorUiControlFactoryData))]
    internal sealed class TemplatedTypeSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedTypeSelectorUiControlFactory(TemplatedTypeSelectorUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedTypeSelectorUiControl control = new TemplatedTypeSelectorUiControl(this.UserControlType);

            return control;
        }
    }



    [Assembler(typeof(TemplatedTypeSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedTypeSelectorUiControlFactoryData : TypeSelectorUiControlFactoryData, Base.ITemplatedUiControlFactoryData
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

    internal sealed class TemplatedTypeSelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedTypeSelectorUiControlFactory(objectConfiguration as TemplatedTypeSelectorUiControlFactoryData);
        }
    }


}
