using System.Collections.Generic;
using System.Configuration;
using System.Web.UI;
using Composite.Forms;
using Composite.Forms.Plugins.UiControlFactory;
using Composite.Forms.WebChannel;
using Composite.StandardPlugins.Forms.WebChannel.Foundation;
using Composite.Validation.ClientValidationRules;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.StandardPlugins.Forms.WebChannel.UiControlFactories
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class UserControlBasedUiControl : UserControl, IWebUiControl
    {
        private string _uiControlId = "IdNotSet";

        public virtual Control BuildWebControl()
        {
            return this;
        }

        public abstract void InitializeViewState();

        public abstract void BindStateToControlProperties();


        public string ClientName { get; set; }

        public bool IsFullWidthControl { get; set; }

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

        public IFormChannelIdentifier UiControlChannel { get; set; }

        public string Label { get; set; }

        public string Help { get; set; }

        public List<ClientValidationRule> ClientValidationRules { get; set; }

        public List<string> SourceBindingPaths { get; set; }
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
