using System.Collections.Generic;
using System.Configuration;
using System.Web.UI;
using Composite.C1Console.Forms;
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
    public abstract class UserControlBasedUiControl : UserControl, IWebUiControl, IValidatingUiControl
    {
        private string _uiControlId = "IdNotSet";


        /// <exclude />
        public virtual Control BuildWebControl()
        {
            return this;
        }


        /// <exclude />
        public abstract void InitializeViewState();


        /// <exclude />
        public abstract void BindStateToControlProperties();


        /// <exclude />
        public string ClientName { get; set; }


        /// <exclude />
        public bool IsFullWidthControl { get; set; }


        /// <exclude />
        public string UiControlID 
        {
            get
            {
                return _uiControlId;
            }
            set
            {
                _uiControlId = value;
                this.ID = _uiControlId;
            }
        }


        /// <exclude />
        public IFormChannelIdentifier UiControlChannel { get; set; }

        /// <exclude />
        public string Label { get; set; }

        /// <exclude />
        public string Help { get; set; }

        /// <exclude />
        public List<ClientValidationRule> ClientValidationRules { get; set; }

        /// <exclude />
        public List<string> SourceBindingPaths { get; set; }

        public virtual bool IsValid { get; set; }

        public virtual string ValidationError { get; set; }
    }


    [ConfigurationElementType(typeof(UserControlBasedUiControlFactoryData))]
    internal sealed class UserControlBasedUiControlFactory : Base.BaseTemplatedUiControlFactory
    {
        public UserControlBasedUiControlFactory(UserControlBasedUiControlFactoryData data)
            : base(data)
        { }

        public override IUiControl CreateControl()
        {
            UserControlBasedUiControl userControlBasedUiControl = this.UserControlType.ActivateAsUserControl<UserControlBasedUiControl>(null);
            userControlBasedUiControl.IsValid = true;

            return userControlBasedUiControl;
        }
    }


    [Assembler(typeof(UserControlBasedUiControlFactoryAssembler))]
    internal sealed class UserControlBasedUiControlFactoryData : UiControlFactoryData, Base.ITemplatedUiControlFactoryData
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

    internal sealed class UserControlBasedUiControlFactoryAssembler : IAssembler<IUiControlFactory, UiControlFactoryData>
    {
        public IUiControlFactory Assemble(IBuilderContext context, UiControlFactoryData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new UserControlBasedUiControlFactory(objectConfiguration as UserControlBasedUiControlFactoryData);
        }
    }
}
