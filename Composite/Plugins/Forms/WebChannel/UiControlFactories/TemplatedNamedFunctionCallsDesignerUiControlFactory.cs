using System;
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
    public abstract class FunctionCallsDesignerTemplateUserControlBase : UserControl
    {
        /// <exclude />
        public abstract string SessionStateProvider { get; set; }

        /// <exclude />
        public abstract Guid SessionStateId { get; set; }
    }


    internal sealed class TemplatedFunctionCallsDesignerUiControl : FunctionCallsDesignerUiControl, IWebUiControl
    {
        private Type _userControlType;
        private FunctionCallsDesignerTemplateUserControlBase _userControl;
        private string _sessionStateProvider;
        private Guid _sessionStateId;

        internal TemplatedFunctionCallsDesignerUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
        }

        public void InitializeViewState()
        {
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<FunctionCallsDesignerTemplateUserControlBase>(this.UiControlID);

            _userControl.SessionStateProvider = _sessionStateProvider;
            _userControl.SessionStateId = _sessionStateId;

            return _userControl;
        }

        public override string SessionStateProvider
        {
            get { return _sessionStateProvider; }
            set { _sessionStateProvider = value; }
        }

        public override Guid SessionStateId
        {
            get { return _sessionStateId; }
            set { _sessionStateId = value; }
        }

        public bool IsFullWidthControl { get { return true; } }

        public string ClientName { get { return null; /* _userControl.GetDataFieldClientName(); */ } }
    }


    [ConfigurationElementType(typeof(TemplatedFunctionCallsDesignerUiControlFactoryData))]
    internal sealed class TemplatedFunctionCallsDesignerUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedFunctionCallsDesignerUiControlFactory(TemplatedFunctionCallsDesignerUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedFunctionCallsDesignerUiControl control = new TemplatedFunctionCallsDesignerUiControl(this.UserControlType);

            return control;
        }
    }


    [Assembler(typeof(TemplatedFunctionCallsDesignerUiControlFactoryAssembler))]
    internal sealed class TemplatedFunctionCallsDesignerUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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


    internal sealed class TemplatedFunctionCallsDesignerUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedFunctionCallsDesignerUiControlFactory(objectConfiguration as TemplatedFunctionCallsDesignerUiControlFactoryData);
        }
    }


}
