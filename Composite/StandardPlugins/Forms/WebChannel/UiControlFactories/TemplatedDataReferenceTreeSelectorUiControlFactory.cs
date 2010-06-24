using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.UI;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;
using Composite.Forms;
using Composite.Forms.CoreUiControls;
using Composite.Forms.Plugins.UiControlFactory;
using Composite.Forms.WebChannel;
using Composite.StandardPlugins.Forms.WebChannel.Foundation;
using Composite.StandardPlugins.Forms.WebChannel.UiControlFactories.Base;
using Composite.Validation.ClientValidationRules;


namespace Composite.StandardPlugins.Forms.WebChannel.UiControlFactories
{
    public abstract class DataReferenceTreeSelectorTemplateUserControlBase : UserControlBase
    {
        public string Selected { get; set; }
        public Type DataType { get; set; }
        public bool NullValueAllowed { get; set; }

        /// <summary>
        /// Defines which kind of dialog and data provider elements are to be shown
        /// </summary>
        public string Handle { get; set; }
        public string SearchToken { get; set; }
        public string RootEntityToken { get; set; }

        public List<ClientValidationRule> ClientValidationRules { get; set; }
    }

    internal sealed class TemplatedDataReferenceTreeSelectorUiControl : DataReferenceTreeSelectorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private DataReferenceTreeSelectorTemplateUserControlBase _userControl;

        internal TemplatedDataReferenceTreeSelectorUiControl(Type userControlType)
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
            _userControl = _userControlType.ActivateAsUserControl<DataReferenceTreeSelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Selected = this.Selected;
            _userControl.NullValueAllowed = this.NullValueAllowed;
            _userControl.DataType = this.DataType;
            _userControl.Handle = this.Handle;
            _userControl.SearchToken = this.SearchToken;
            _userControl.RootEntityToken = this.RootEntityToken;
            _userControl.ClientValidationRules = this.ClientValidationRules;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }


    [ConfigurationElementType(typeof(TemplatedDataReferenceTreeSelectorUiControlFactoryData))]
    internal sealed class TemplatedDataReferenceTreeSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedDataReferenceTreeSelectorUiControlFactory(TemplatedDataReferenceTreeSelectorUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedDataReferenceTreeSelectorUiControl control = new TemplatedDataReferenceTreeSelectorUiControl(this.UserControlType);

            return control;
        }
    }

    [Assembler(typeof(TemplatedDataReferenceTreeSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedDataReferenceTreeSelectorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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


    internal sealed class TemplatedDataReferenceTreeSelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedDataReferenceTreeSelectorUiControlFactory(objectConfiguration as TemplatedDataReferenceTreeSelectorUiControlFactoryData);
        }
    }
}
