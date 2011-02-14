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
    public abstract class FileUploadTemplateUserControlBase : UserControl
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
        public UploadedFile UploadedFile { get; set; }


        /// <exclude />
        public string FormControlLabel { get; set; }
    }


    internal sealed class TemplatedFileUploadUiControl : FileUploadUiControl, IWebUiControl
    {
        private Type _userControlType;
        private FileUploadTemplateUserControlBase _userControl;

        internal TemplatedFileUploadUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }


        /// <exclude />
        public override void BindStateToControlProperties()
        {
            _userControl.BindStateToControlProperties();
            this.UploadedFile = _userControl.UploadedFile;
        }


        /// <exclude />
        public void InitializeViewState()
        {
            _userControl.InitializeWebViewState();
        }


        /// <exclude />
        public Control BuildWebControl()
        {
            _userControl = _userControlType.ActivateAsUserControl<FileUploadTemplateUserControlBase>(this.UiControlID);

            _userControl.FormControlLabel = this.Label;
            _userControl.UploadedFile = this.UploadedFile;

            return _userControl;
        }


        /// <exclude />
        public bool IsFullWidthControl { get { return false; } }


        /// <exclude />
        public string ClientName { get { return _userControl.GetDataFieldClientName(); } }
    }


    [ConfigurationElementType(typeof(TemplatedFileUploadUiControlFactoryData))]
    internal sealed class TemplatedFileUploadUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedFileUploadUiControlFactory(TemplatedFileUploadUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedFileUploadUiControl control = new TemplatedFileUploadUiControl(this.UserControlType);

            return control;
        }
    }


    [Assembler(typeof(TemplatedFileUploadUiControlFactoryAssembler))]
    internal sealed class TemplatedFileUploadUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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


    internal sealed class TemplatedFileUploadUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedFileUploadUiControlFactory(objectConfiguration as TemplatedFileUploadUiControlFactoryData);
        }
    }
}
