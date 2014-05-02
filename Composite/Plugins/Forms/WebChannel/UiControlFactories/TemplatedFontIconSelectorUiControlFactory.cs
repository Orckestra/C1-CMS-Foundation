using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.UI;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.CoreUiControls;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.WebChannel;
using Composite.Plugins.Forms.WebChannel.Foundation;
using Composite.Data.Validation.ClientValidationRules;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class FontIconSelectorTemplateUserControlBase : UserControl
    {
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
        public string SelectedClassName { get; set; }

        /// <exclude />
        public Dictionary<string,string> ClassNameOptions { get; set; }

        /// <exclude />
        public string ClassNamePrefix { get; set; }

        /// <exclude />
        public string StylesheetPath { get; set; }

        /// <exclude />
        public string FormControlLabel { get; set; }

        /// <exclude />
        public bool Required { get; set; }

        /// <exclude />
        public List<ClientValidationRule> ClientValidationRules { get; set; }
    }



    internal sealed class TemplatedFontIconSelectorUiControl : FontIconSelectorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private FontIconSelectorTemplateUserControlBase _userControl;

        internal TemplatedFontIconSelectorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.SelectedClassName = _userControl.SelectedClassName;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<FontIconSelectorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.SelectedClassName = this.SelectedClassName;
            _userControl.ClientValidationRules = this.ClientValidationRules;
            _userControl.StylesheetPath = this.StylesheetPath;
            _userControl.ClassNamePrefix = this.ClassNamePrefix;
            _userControl.Required = this.Required;

            if (this.ClassNameOptions is string)
            {
                _userControl.ClassNameOptions = ((string)this.ClassNameOptions).Split(',').ToDictionary(f=>f);
            }
            else
            {
                if (this.ClassNameOptions is IEnumerable<string>)
                {
                    _userControl.ClassNameOptions = ((IEnumerable<string>)this.ClassNameOptions).ToDictionary(f => f);
                }
                else
                {
                    if (this.ClassNameOptions is Dictionary<string,string>)
                    {
                        _userControl.ClassNameOptions = (Dictionary<string, string>)this.ClassNameOptions;
                    }
                    else
                    {
                        throw new NotImplementedException("ClassNameOptions should be either a (comma seperated) string, a IEnumerable<string> or a Dictionary<string,string>.");
                    }
                }
            }

            return _userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }



    [ConfigurationElementType(typeof(TemplatedFontIconSelectorUiControlFactoryData))]
    internal sealed class TemplatedFontIconSelectorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedFontIconSelectorUiControlFactory(TemplatedFontIconSelectorUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedFontIconSelectorUiControl control = new TemplatedFontIconSelectorUiControl(this.UserControlType);

            return control;
        }
    }



    [Assembler(typeof(TemplatedFontIconSelectorUiControlFactoryAssembler))]
    internal sealed class TemplatedFontIconSelectorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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



    internal sealed class TemplatedFontIconSelectorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedFontIconSelectorUiControlFactory(objectConfiguration as TemplatedFontIconSelectorUiControlFactoryData);
        }
    }
}
