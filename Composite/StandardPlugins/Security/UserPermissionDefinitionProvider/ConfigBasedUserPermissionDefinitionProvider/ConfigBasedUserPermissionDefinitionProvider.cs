using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Composite.Security;
using Composite.Security.Plugins.UserPermissionDefinitionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.StandardPlugins.Security.UserPermissionDefinitionProvider.ConfigBasedUserPermissionDefinitionProvider
{
    [ConfigurationElementType(typeof(ConfigBasedUserPermissionDefinitionProviderData))]
    internal sealed class ConfigBasedUserPermissionDefinitionProvider : IUserPermissionDefinitionProvider
	{
        List<UserPermissionDefinition> _userPermissionDefinitions = new List<UserPermissionDefinition>();

        public ConfigBasedUserPermissionDefinitionProvider(ConfigBasedUserPermissionDefinitionProviderData configBasedUserPermissionDefinitionProviderData)
        {
            foreach (UserPermissionDefinitionConfigurationElement element in configBasedUserPermissionDefinitionProviderData.UserPermissionDefinitions)
            {
                _userPermissionDefinitions.Add(new ConfigUserPermissionDefinition(element));
            }
        }



        public IEnumerable<UserPermissionDefinition> AllUserPermissionDefinitions
        {
            get 
            { 
                foreach (UserPermissionDefinition userPermissionDefinition in _userPermissionDefinitions)
                {
                    yield return userPermissionDefinition;
                }
            }
        }



        public bool CanAlterDefinitions
        {
            get { return false; }
        }



        public void SetUserPermissionDefinition(UserPermissionDefinition userPermissionDefinition)
        {
            throw new NotImplementedException();
        }



        public void RemoveUserPermissionDefinition(UserToken userToken, string serializedEntityToken)
        {
            throw new NotImplementedException();
        }



        internal sealed class ConfigUserPermissionDefinition : UserPermissionDefinition
        {
            UserPermissionDefinitionConfigurationElement _element;


            public ConfigUserPermissionDefinition(UserPermissionDefinitionConfigurationElement element)
            {
                _element = element;
            }


            public override string Username
            {
                get
                {
                    return _element.Username;
                }
            }


            public override IEnumerable<PermissionType> PermissionTypes
            {
                get
                {
                    throw new NotImplementedException();
                    //return _element.PermissionName;
                }
            }


            public override string SerializedEntityToken
            {
                get
                {
                    return _element.SerializedEntityToken;
                }
            }
        }

        #region IUserPermissionDefinitionProvider Members


        public IEnumerable<UserPermissionDefinition> GetPermissionsByUser(string userName)
        {
            return from urd in AllUserPermissionDefinitions
                   where urd.Username == userName
                   select urd;
        }

        #endregion
    }



    [Assembler(typeof(ConfigBasedUserPermissionDefinitionProviderAssembler))]
    internal sealed class ConfigBasedUserPermissionDefinitionProviderData : UserPermissionDefinitionProviderData
    {
        private const string _userPermissionDefinitionsProperty = "UserPermissionDefinitions";
        [ConfigurationProperty(_userPermissionDefinitionsProperty, IsRequired = true)]
        public UserPermissionDefinitionConfigurationElementCollection UserPermissionDefinitions
        {
            get
            {
                return (UserPermissionDefinitionConfigurationElementCollection)base[_userPermissionDefinitionsProperty];
            }
        }
    }



    internal sealed class UserPermissionDefinitionConfigurationElement : ConfigurationElement
    {
        private const string _usernameProperty = "username";
        [ConfigurationProperty(_usernameProperty, IsRequired = true)]
        public string Username
        {
            get { return (string)base[_usernameProperty]; }
            set { base[_usernameProperty] = value; }
        }



        private const string _permissionTypeNameProperty = "permissionTypeName";
        [ConfigurationProperty(_permissionTypeNameProperty, IsRequired = true)]
        public string PermissionTypeName
        {
            get { return (string)base[_permissionTypeNameProperty]; }
            set { base[_permissionTypeNameProperty] = value; }
        }



        private const string _serializedEntityTokenProperty = "serializedEntityToken";
        [ConfigurationProperty(_serializedEntityTokenProperty, IsRequired = true)]
        public string SerializedEntityToken
        {
            get { return (string)base[_serializedEntityTokenProperty]; }
            set { base[_serializedEntityTokenProperty] = value; }
        }


        public string CompositionName
        {
            get
            {
                return string.Format("{0}{1}{2}", this.Username, this.PermissionTypeName, this.SerializedEntityToken);
            }
        }
    }




    internal sealed class UserPermissionDefinitionConfigurationElementCollection : ConfigurationElementCollection
    {
        public void Add(UserPermissionDefinitionConfigurationElement element)
        {
            base.BaseAdd(element);
        }

        protected override ConfigurationElement CreateNewElement()
        {
            return new UserPermissionDefinitionConfigurationElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            UserPermissionDefinitionConfigurationElement castedElement = (UserPermissionDefinitionConfigurationElement)element;

            return castedElement.CompositionName;
        }
    }




    internal sealed class ConfigBasedUserPermissionDefinitionProviderAssembler : IAssembler<IUserPermissionDefinitionProvider, UserPermissionDefinitionProviderData>
    {
        public IUserPermissionDefinitionProvider Assemble(IBuilderContext context, UserPermissionDefinitionProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            ConfigBasedUserPermissionDefinitionProviderData data = (ConfigBasedUserPermissionDefinitionProviderData)objectConfiguration;

            return new ConfigBasedUserPermissionDefinitionProvider(data);
        }
    }
}
