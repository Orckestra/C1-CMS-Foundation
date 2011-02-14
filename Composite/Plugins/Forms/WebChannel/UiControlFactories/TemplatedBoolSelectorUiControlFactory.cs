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
    public abstract class BoolSelectorTemplateUserControlBase : UserControl
    {
        private string _formControlLabel;
        private bool _isTrue;

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
        public bool IsTrue
        {
            get { return _isTrue; }
            set { _isTrue = value; }
        }

        /// <exclude />
        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }


        /// <exclude />
        public string TrueLabel { get; set; }

        /// <exclude />
        public string FalseLabel { get; set; }
    }

    internal sealed class TemplatedBoolSelectorUiControl : BoolSelectorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private BoolSelectorTemplateUserControlBase _userControl;

        internal TemplatedBoolSelectorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.IsTrue = _userControl.IsTrue;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<BoolSelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.IsTrue = this.IsTrue;
            _userControl.TrueLabel = this.TrueLabel;
            _userControl.FalseLabel = this.FalseLabel;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }


    [ConfigurationElementType(typeof(TemplatedBoolSelectorUiControlFactoryData))]
    internal sealed class TemplatedBoolSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedBoolSelectorUiControlFactory(TemplatedBoolSelectorUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedBoolSelectorUiControl control = new TemplatedBoolSelectorUiControl(this.UserControlType);

            return control;
        }
    }

    [Assembler(typeof(TemplatedBoolSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedBoolSelectorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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

    internal sealed class TemplatedBoolSelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedBoolSelectorUiControlFactory(objectConfiguration as TemplatedBoolSelectorUiControlFactoryData);
        }
    }


}
