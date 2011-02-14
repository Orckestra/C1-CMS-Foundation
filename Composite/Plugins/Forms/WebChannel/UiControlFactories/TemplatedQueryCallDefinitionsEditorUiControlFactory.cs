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
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class QueryCallDefinitionsEditorTemplateUserControlBase : UserControl
    {
        private string _formControlLabel;

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
        public IEnumerable<KeyValuePair<string, Guid>> Queries { get; set; }

        /// <exclude />
        public ILookup<string, KeyValuePair<string, string>> Parameters { get; set; }

        /// <exclude />
        public string UserProvidedPreviewXml { get; set; }

        /// <exclude />
        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }

    }


    internal sealed class TemplatedQueryCallDefinitionsEditorUiControl : QueryCallDefinitionsEditorUiControl, IWebUiControl
    {
        private Type _userControlType;
        private QueryCallDefinitionsEditorTemplateUserControlBase _userControl;

        internal TemplatedQueryCallDefinitionsEditorUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.Queries = _userControl.Queries;
            this.Parameters = _userControl.Parameters;
            this.UserProvidedPreviewXml = _userControl.UserProvidedPreviewXml;
        }

        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<QueryCallDefinitionsEditorTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.Queries = this.Queries;
            _userControl.Parameters = this.Parameters;

            return _userControl;
        }

        public bool IsFullWidthControl { get { return true; } }

        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }



    [ConfigurationElementType(typeof(TemplatedQueryCallDefinitionsEditorUiControlFactoryData))]
    internal sealed class TemplatedQueryCallDefinitionsEditorUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedQueryCallDefinitionsEditorUiControlFactory(TemplatedQueryCallDefinitionsEditorUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedQueryCallDefinitionsEditorUiControl control = new TemplatedQueryCallDefinitionsEditorUiControl(base.UserControlType);

            return control;
        }
    }


    [Assembler(typeof(TemplatedQueryCallDefinitionsEditorUiControlFactoryAssembler))]
    internal sealed class TemplatedQueryCallDefinitionsEditorUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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

    internal sealed class TemplatedQueryCallDefinitionsEditorUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedQueryCallDefinitionsEditorUiControlFactory(objectConfiguration as TemplatedQueryCallDefinitionsEditorUiControlFactoryData);
        }
    }
}
