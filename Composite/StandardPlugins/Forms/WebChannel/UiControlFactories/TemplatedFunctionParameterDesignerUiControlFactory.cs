using System;
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
    public abstract class FunctionParameterDesignerTemplateUserControlBase : UserControl
    {
        public abstract string SessionStateProvider { get; set; }

        public abstract Guid SessionStateId { get; set; }
    }


    internal sealed class TemplatedFunctionParameterDesignerUiControl : FunctionParameterDesignerUiControl, IWebUiControl
    {
        private Type _userControlType;
        private FunctionParameterDesignerTemplateUserControlBase _userControl;
        private string _sessionStateProvider;
        private Guid _sessionStateId;

        internal TemplatedFunctionParameterDesignerUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public void InitializeViewState()
        {
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<FunctionParameterDesignerTemplateUserControlBase>(this.UiControlID);
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


    [ConfigurationElementType(typeof(TemplatedFunctionParameterDesignerUiControlFactoryData))]
    internal sealed class TemplatedFunctionParameterDesignerUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedFunctionParameterDesignerUiControlFactory(TemplatedFunctionParameterDesignerUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            return new TemplatedFunctionParameterDesignerUiControl(this.UserControlType);
        }
    }


    [Assembler(typeof(TemplatedFunctionParameterDesignerUiControlFactoryAssembler))]
    internal sealed class TemplatedFunctionParameterDesignerUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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


    internal sealed class TemplatedFunctionParameterDesignerUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedFunctionParameterDesignerUiControlFactory(objectConfiguration as TemplatedFunctionParameterDesignerUiControlFactoryData);
        }
    }


}
