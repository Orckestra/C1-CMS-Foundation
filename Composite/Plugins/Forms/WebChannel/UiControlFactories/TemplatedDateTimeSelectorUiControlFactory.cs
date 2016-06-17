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
    public abstract class DateTimeSelectorTemplateUserControlBase : UserControl
    {
        private string _formControlLabel;
        private DateTime? _date;

        /// <exclude />
        public abstract void BindStateToProperties();

        /// <exclude />
        public abstract void InitializeViewState();

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
        public DateTime? Date
        {
            get { return _date; }
            set { _date = value; }
        }

        /// <exclude />
        public bool IsValid
        {
            get;
            set;
        }

        /// <exclude />
        public string ValidationError
        {
            get;
            set;
        }

        /// <exclude />
        public bool ReadOnly
        {
            get;
            set;
        }

        /// <exclude />
        public bool ShowHours
        {
            get;
            set;
        }

        /// <exclude />
        public bool Required
        {
            get;
            set;
        }

        /// <exclude />
        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }
    }



    internal sealed class TemplatedDateTimeSelectorUiControl : DateTimeSelectorUiControl, IWebUiControl, IValidatingUiControl
    {
        private readonly Type _userControlType;
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
            _userControl.ReadOnly = this.ReadOnly;
            _userControl.ShowHours = this.ShowHours;
            _userControl.IsValid = true;
            _userControl.Required = this.Required;

            return _userControl;
        }

        public bool IsFullWidthControl => false;

        public string ClientName => _userControl.GetDataFieldClientName();

        public bool IsValid => _userControl.IsValid;

        public bool ShowHours
        {
            get; set;
        }

        public string ValidationError => _userControl.ValidationError;
    }


    [ConfigurationElementType(typeof(TemplatedDateTimeSelectorUiControlFactoryData))]
    internal sealed class TemplatedDateTimeSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        private readonly bool _showHours;

        public TemplatedDateTimeSelectorUiControlFactory(TemplatedDateTimeSelectorUiControlFactoryData data)
            : base(data)
        {
            _showHours = data.ShowHours;
        }

        public override IUiControl CreateControl()
        {
            return new TemplatedDateTimeSelectorUiControl(this.UserControlType)
            {
                ShowHours = _showHours
            };
        }
    }

    [Assembler(typeof(TemplatedDateTimeSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedDateTimeSelectorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
    {
        private const string _userControlVirtualPathPropertyName = "userControlVirtualPath";
        private const string _cacheCompiledUserControlTypePropertyName = "cacheCompiledUserControlType";
        private const string _showHoursPropertyName = "showHours";

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

        [ConfigurationProperty(_showHoursPropertyName, IsRequired = true)]
        public bool ShowHours
        {
            get { return (bool)base[_showHoursPropertyName]; }
            set { base[_showHoursPropertyName] = value; }
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
