using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Composite.C1Console.Security.Plugins.LoginProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Plugins.Security.LoginProviderPlugins.ConfigBasedFormLoginProvider
{
    [ConfigurationElementType(typeof(ConfigBasedFormLoginProviderData))]
    internal sealed class ConfigBasedFormLoginProvider : IFormLoginProvider
    {
        private NamedElementCollection<ValidLoginConfigurationElement> _validLogins;

        internal ConfigBasedFormLoginProvider(NamedElementCollection<ValidLoginConfigurationElement> validLogins)
        {
            _validLogins = validLogins;
        }


        public IEnumerable<string> AllUsernames
        {
            get { return _validLogins.Select(f => f.Name); }
        }



        public bool CanSetUserPassword
        {
            get { return false; }
        }



        bool IFormLoginProvider.Validate(string username, string password)
        {
            if (_validLogins.Contains(username))
            {
                ValidLoginConfigurationElement usernameMatch = _validLogins.Get(username);

                return usernameMatch.Password == password;
            }

            return false;
        }


        public void SetUserPassword(string username, string password)
        {
            throw new NotImplementedException();
        }


        public bool CanAddNewUser
        {
            get { return false; }
        }


        public void AddNewUser(string userName, string password, string group)
        {
            throw new NotImplementedException();
        }


        public bool UsersExists
        {
            get { return _validLogins.Any(); }
        }
    }


    [Assembler(typeof(ConfigBasedFormLoginProviderAssembler))]
    internal sealed class ConfigBasedFormLoginProviderData : LoginProviderData
    {
        private const string _validLoginsProperty = "ValidLogins";
        [ConfigurationProperty(_validLoginsProperty, IsRequired = true)]
        public NamedElementCollection<ValidLoginConfigurationElement> ValidLogins
        {
            get
            {
                return (NamedElementCollection<ValidLoginConfigurationElement>)base[_validLoginsProperty];
            }
        }        
    }

    internal sealed class ConfigBasedFormLoginProviderAssembler : IAssembler<ILoginProvider, LoginProviderData>
    {
        public ILoginProvider Assemble(Microsoft.Practices.ObjectBuilder.IBuilderContext context, LoginProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            ConfigBasedFormLoginProviderData myConfiguration = (ConfigBasedFormLoginProviderData)objectConfiguration;
            return new ConfigBasedFormLoginProvider(myConfiguration.ValidLogins);
        }
    }

    internal sealed class ValidLoginConfigurationElement : NamedConfigurationElement
    {
        private const string _passwordProperty = "password";
        [ConfigurationProperty(_passwordProperty, IsRequired = true)]
        public string Password
        {
            get { return (string)base[_passwordProperty]; }
            set { base[_passwordProperty] = value; }
        }
    }
}
