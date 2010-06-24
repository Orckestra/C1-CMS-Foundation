using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Collections.Generic;
using Composite.ConfigurationSystem;
using Composite.EventSystem;
using Composite.Security.BuildinPlugins.BuildinUserPermissionDefinitionProvider;
using Composite.Security.Plugins.UserPermissionDefinitionProvider;
using Composite.Security.Plugins.UserPermissionDefinitionProvider.Runtime;


namespace Composite.Security.Foundation.PluginFacades
{
    internal static class UserPermissionDefinitionProviderPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitializeResources);



        static UserPermissionDefinitionProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static bool HasConfiguration()
        {
            return (ConfigurationServices.ConfigurationSource != null) &&
                   (ConfigurationServices.ConfigurationSource.GetSection(UserPermissionDefinitionProviderSettings.SectionName) != null);
        }



        public static IEnumerable<UserPermissionDefinition> AllUserPermissionDefinitions
        {
            get
            {
                return _resourceLocker.Resources.Plugin.AllUserPermissionDefinitions;
            }
        }



        public static bool CanAlterDefinitions
        {
            get
            {
                return _resourceLocker.Resources.Plugin.CanAlterDefinitions;
            }
        }



        public static void SetUserPermissionDefinition(UserPermissionDefinition userPermissionDefinition)
        {
            if (userPermissionDefinition == null) throw new ArgumentNullException("userPermissionDefinition");
            if (string.IsNullOrEmpty(userPermissionDefinition.SerializedEntityToken) == true) throw new ArgumentNullException("userPermissionDefinition");
            if (string.IsNullOrEmpty(userPermissionDefinition.Username) == true) throw new ArgumentNullException("userPermissionDefinition");

            _resourceLocker.Resources.Plugin.SetUserPermissionDefinition(userPermissionDefinition);
        }



        public static void RemoveUserPermissionDefinition(UserToken userToken, string serializedEntityToken)
        {
            if (userToken == null) throw new ArgumentNullException("userToken");
            if (string.IsNullOrEmpty(serializedEntityToken) == true) throw new ArgumentNullException("serializedEntityToken");

            _resourceLocker.Resources.Plugin.RemoveUserPermissionDefinition(userToken, serializedEntityToken);
        }



        public static IEnumerable<UserPermissionDefinition> GetPermissionsByUser(string userName)
        {
            return _resourceLocker.Resources.Plugin.GetPermissionsByUser(userName);
        }



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", UserPermissionDefinitionProviderSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public UserPermissionDefinitionProviderFactory Factory { get; set; }
            public IUserPermissionDefinitionProvider Plugin { get; set; }

            public static void DoInitializeResources(Resources resources)
            {
                if (HasConfiguration() == true)
                {
                    try
                    {
                        resources.Factory = new UserPermissionDefinitionProviderFactory();
                        resources.Plugin = resources.Factory.CreateDefault();
                    }
                    catch (ArgumentException ex)
                    {
                        HandleConfigurationError(ex);
                    }
                    catch (ConfigurationErrorsException ex)
                    {
                        HandleConfigurationError(ex);
                    }
                }
                else
                {
                    resources.Plugin = new BuildinUserPermissionDefinitionProvider();
                }
            }
        }
    }
}
