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
    public abstract class DateTimeSelectorTemplateUserControlBase : UserControl
    {
        private string _formControlLabel;
        private DateTime? _date;

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

        public DateTime? Date
        {
            get { return _date; }
            set { _date = value; }
        }

        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }
    }



    internal sealed class TemplatedDateTimeSelectorUiControl : DateTimeSelectorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private DateTimeSelectorTemplateUserControlBase _userControl;

        internal TemplatedDateTimeSelectorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.Date = _userControl.Date;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<DateTimeSelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Date = this.Date;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }


    [ConfigurationElementType(typeof(TemplatedDateTimeSelectorUiControlFactoryData))]
    internal sealed class TemplatedDateTimeSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedDateTimeSelectorUiControlFactory(TemplatedDateTimeSelectorUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedDateTimeSelectorUiControl control = new TemplatedDateTimeSelectorUiControl(this.UserControlType);

            return control;
        }
    }

    [Assembler(typeof(TemplatedDateTimeSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedDateTimeSelectorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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

    internal sealed class TemplatedDateTimeSelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedDateTimeSelectorUiControlFactory(objectConfiguration as TemplatedDateTimeSelectorUiControlFactoryData);
        }
    }


}
