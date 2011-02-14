using System;
using System.Configuration;
using System.Web.UI;
using Composite.Data;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Composite.Plugins.Forms.WebChannel.Foundation;
using Composite.Plugins.Forms.WebChannel.UiControlFactories.Base;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class DataReferenceSelectorTemplateUserControlBase : UserControlBase
    {
        /// <exclude />
        public IDataReference Selected { get; set; }


        /// <exclude />
        public Type DataType { get; set; }
    }




    internal sealed class TemplatedDataReferenceSelectorUiControl : DataReferenceSelectorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private DataReferenceSelectorTemplateUserControlBase _userControl;

        internal TemplatedDataReferenceSelectorUiControl(Type userControlType)
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
            _userControl = _userControlType.ActivateAsUserControl<DataReferenceSelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Selected = this.Selected as IDataReference;
            _userControl.DataType = this.DataType;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }


    [ConfigurationElementType(typeof(TemplatedDataReferenceSelectorUiControlFactoryData))]
    internal sealed class TemplatedDataReferenceSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedDataReferenceSelectorUiControlFactory(TemplatedDataReferenceSelectorUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedDataReferenceSelectorUiControl control = new TemplatedDataReferenceSelectorUiControl(this.UserControlType);

            return control;
        }
    }

    [Assembler(typeof(TemplatedDataReferenceSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedDataReferenceSelectorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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

    internal sealed class TemplatedDataReferenceSelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedDataReferenceSelectorUiControlFactory(objectConfiguration as TemplatedDataReferenceSelectorUiControlFactoryData);
        }
    }


}
