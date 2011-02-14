using System;
using System.Collections.Generic;
using System.Configuration;
using System.Web.UI;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Composite.Plugins.Forms.WebChannel.Foundation;
using Composite.Plugins.Forms.WebChannel.UiControlFactories.Base;
using Composite.Data.Validation.ClientValidationRules;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;
using Composite.Data.Types;
using Composite.Data;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class PageReferenceSelectorTemplateUserControlBase : UserControlBase
    {
        private DataReference<IPage> _selected;

        /// <exclude />
        public DataReference<IPage> Selected
        {
            get { return _selected; }
            set { _selected = value; }
        }

        /// <exclude />
        public List<ClientValidationRule> ClientValidationRules { get; set; }
    }



    internal sealed class TemplatedPageReferenceSelectorUiControl : PageReferenceSelectorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private PageReferenceSelectorTemplateUserControlBase _userControl;

        internal TemplatedPageReferenceSelectorUiControl(Type userControlType)
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
            _userControl = _userControlType.ActivateAsUserControl<PageReferenceSelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Selected = this.Selected;
            _userControl.ClientValidationRules = this.ClientValidationRules;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }

    [ConfigurationElementType(typeof(TemplatedPageReferenceSelectorUiControlFactoryData))]
    internal sealed class TemplatedPageReferenceSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedPageReferenceSelectorUiControlFactory(TemplatedPageReferenceSelectorUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedPageReferenceSelectorUiControl control = new TemplatedPageReferenceSelectorUiControl(this.UserControlType);

            return control;
        }
    }

    [Assembler(typeof(TemplatedPageReferenceSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedPageReferenceSelectorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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


    internal sealed class TemplatedPageReferenceSelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedPageReferenceSelectorUiControlFactory(objectConfiguration as TemplatedPageReferenceSelectorUiControlFactoryData);
        }
    }
}
