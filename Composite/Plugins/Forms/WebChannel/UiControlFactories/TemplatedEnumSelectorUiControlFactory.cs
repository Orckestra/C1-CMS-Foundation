using System;
using System.Collections.Generic;
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
    public abstract class EnumSelectorTemplateUserControlBase : UserControl
    {
        private string _formControlLabel;
        private string _selected;

        private TemplatedEnumSelectorUiControl _typeOptionsProxy;

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

        internal void SetTypeOptionsProxy(TemplatedEnumSelectorUiControl proxy)
        {
            _typeOptionsProxy = proxy;
        }

        /// <exclude />
        public string Selected
        {
            get { return _selected; }
            set { _selected = value; }
        }

        /// <exclude />
        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }

        /// <exclude />
        public IEnumerable<string> Options
        {
            get
            {
                return _typeOptionsProxy.FetchOptions();
            }
        }

    }


    internal sealed class TemplatedEnumSelectorUiControl : EnumSelectorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private EnumSelectorTemplateUserControlBase _userControl;


        internal TemplatedEnumSelectorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }


        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.Selected = _userControl.Selected;
        }


        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<EnumSelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Selected = this.Selected;
            _userControl.SetTypeOptionsProxy(this);

            return _userControl;
        }


        internal IEnumerable<string> FetchOptions()
        {
            return Enum.GetNames(base.EnumType);
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }


    [ConfigurationElementType(typeof(TemplatedEnumSelectorUiControlFactoryData))]
    internal sealed class TemplatedEnumSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedEnumSelectorUiControlFactory(TemplatedEnumSelectorUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedEnumSelectorUiControl control = new TemplatedEnumSelectorUiControl(this.UserControlType);

            return control;
        }
    }



    [Assembler(typeof(TemplatedEnumSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedEnumSelectorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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



    internal sealed class TemplatedEnumSelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedEnumSelectorUiControlFactory(objectConfiguration as TemplatedEnumSelectorUiControlFactoryData);
        }
    }
}
