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
    public class SaveButtonTemplateUserControlBase : UserControl
    {
        private string _formControlLabel;
        private EventHandler _saveEventHandler;
        private EventHandler _saveAndPublishEventHandler;

        /// <exclude />
        public EventHandler SaveEventHandler
        {
            get { return _saveEventHandler; }
            set { _saveEventHandler = value; }
        }

        /// <exclude />
        public EventHandler SaveAndPublishEventHandler
        {
            get { return _saveAndPublishEventHandler; }
            set { _saveAndPublishEventHandler = value; }
        }

        /// <exclude />
        public string FormControlLabel
        {
            get { return _formControlLabel; }
            set { _formControlLabel = value; }
        }

    }

    internal sealed class TemplatedSaveButtonUiControl : SaveButtonUiControl, IWebUiControl
    {
        private Type _userControlType;

        internal TemplatedSaveButtonUiControl(Type userControlType)
        {
            _userControlType = userControlType;
        }

        public void InitializeViewState()
        {
        }

        public Control BuildWebControl()
        {
            SaveButtonTemplateUserControlBase userControl = _userControlType.ActivateAsUserControl<SaveButtonTemplateUserControlBase>(this.UiControlID);

            userControl.FormControlLabel = this.Label;
            userControl.SaveEventHandler += this.SaveEventHandler;
            userControl.SaveAndPublishEventHandler += this.SaveAndPublishEventHandler;

            return userControl;
        }

        public bool IsFullWidthControl { get { return false; } }

        public string ClientName { get { return null; } }
    }


    [ConfigurationElementType(typeof(TemplatedSaveButtonUiControlFactoryData))]
    internal sealed class TemplatedSaveButtonUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public TemplatedSaveButtonUiControlFactory(TemplatedSaveButtonUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            TemplatedSaveButtonUiControl control = new TemplatedSaveButtonUiControl(this.UserControlType);

            return control;
        }
    }



    [Assembler(typeof(TemplatedSaveButtonUiControlFactoryAssembler))]
    internal sealed class TemplatedSaveButtonUiControlFactoryData : ButtonUiControlFactoryData, Base.ITemplatedUiControlFactoryData
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


    internal sealed class TemplatedSaveButtonUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new TemplatedSaveButtonUiControlFactory(objectConfiguration as TemplatedSaveButtonUiControlFactoryData);
        }
    }


}
