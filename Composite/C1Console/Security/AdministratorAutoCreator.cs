using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Elements;
using Composite.C1Console.Security.Foundation.PluginFacades;
using Composite.C1Console.Users;
using Composite.Core;
using Composite.Core.Configuration;
using Composite.Core.Logging;
using Composite.Core.ResourceSystem;
using Composite.Data;
using Composite.Data.Types;


namespace Composite.C1Console.Security
{
    /// <summary>
    /// Can create "the first user" on a newly installed system. This class only works if
    ///  - no other users has been created before
    ///  - the global configuration contains a "auto create administrator" user name
    ///  - the provided user name matches the user name from the global configuration
    ///  - the provided password validates as a non-weak password
    ///  - the used login provider supports adding users
    ///  - the used permission provider supports adding permission types
    /// </summary>
	internal static class AdministratorAutoCreator
	{
        public static bool CanBeAutoCreated(string userName)
        {
            string defaultAdminUserName = GlobalSettingsFacade.AutoCreatedAdministratorUserName;

            return !string.IsNullOrEmpty(defaultAdminUserName)
                   && userName == defaultAdminUserName
                   && !LoginProviderPluginFacade.UsersExists;
        }

        /// <summary>
        /// Used for "first time" login on systems configured for this. A way to create the first user. This only works on systems
        /// with no users and with a valid "auto create admin username" specified by the global settings.
        /// </summary>
        /// <param name="userName">The user name - must match GlobalSettingsProvider.AutoCreatedAdministratorUserName</param>
        /// <param name="password">A password that meets a minimum requirement.</param>
        /// <param name="email">THe users email.</param>
        /// <param name="validateAutoCreateUserName">When true only the username specified in Composite.config as auto createable (usually 'admin') is allowed. Set to false to use a different user name.</param>
        /// <returns>true if the user was auto created. Otherwise false.</returns>
        public static void AutoCreateAdministrator(string userName, string password, string email, bool validateAutoCreateUserName = true)
        {
            if (validateAutoCreateUserName && !CanBeAutoCreated(userName))
            {
                throw new InvalidOperationException("Unable to auto create account. Either the user name is not eligble for auto creation or other users exists in the system. This feature only works for a specific user name and when no users exists.");
            }

            if (!LoginProviderPluginFacade.CanAddNewUser)
            {
                throw new InvalidOperationException("Unable to auto create account. The current login provider does not support adding users");
            }

            if (!PermissionTypeFacade.CanAlterDefinitions)
            {
                throw new InvalidOperationException("Unable to auto create account. The current permission defintion provider does not support changes");
            }

            //PasswordValidator validator = new PasswordValidator();
            //ValidationResults validationResults = validator.Validate(password);
            //if (validationResults.IsValid == false)
            //{
            //    throw new InvalidOperationException("Unable to auto create account. The specified password is not strong enough.");
            //}

            
            // All seems bo be ok green light go for auto creating the user.
            string group = StringResourceSystemFacade.GetString("Composite.C1Console.Users", "AdministratorAutoCreator.DefaultGroupName");

            LoginProviderPluginFacade.FormAddNewUser(userName, password, group, email);
            Log.LogVerbose("AdministratorAutoCreator", String.Format("Auto Created Administrator with user name '{0}'.", userName), LoggingService.Category.Audit);

            IUser user = DataFacade.GetData<IUser>().Where(f => f.Username == userName).SingleOrDefault();
            IUserGroup userGroup = DataFacade.GetData<IUserGroup>().Where(f => f.Name == "Administrator").SingleOrDefault();
            if (user != null && userGroup != null)
            {
                IUserUserGroupRelation userUserGroupRelation = DataFacade.BuildNew<IUserUserGroupRelation>();
                userUserGroupRelation.UserId = user.Id;
                userUserGroupRelation.UserGroupId = userGroup.Id;
                DataFacade.AddNew<IUserUserGroupRelation>(userUserGroupRelation);
            }
            else
            {
                foreach (Element appRootElement in ElementFacade.GetRootsWithNoSecurity())
                {
                    string serializedEntityToken = EntityTokenSerializer.Serialize(appRootElement.ElementHandle.EntityToken);
                    LoggingService.LogVerbose("AdministratorAutoCreator", String.Format("Adding '{0}' on element '{1}' ('{2}').", userName, appRootElement.VisualData.Label ?? "(no label)", serializedEntityToken), LoggingService.Category.Audit);

                    UserPermissionDefinition userPermissionDefinition = new ConstructorBasedUserPermissionDefinition(userName, PermissionTypeFacade.GrantingPermissionTypes, serializedEntityToken);
                    PermissionTypeFacade.SetUserPermissionDefinition(userPermissionDefinition);
                }

                Log.LogVerbose("AdministratorAutoCreator", string.Format("Activating all known perspectives for user '{0}'", userName));
                IEnumerable<EntityToken> perspectiveEntityTokens = ElementFacade.GetPerspectiveElementsWithNoSecurity().Select(f => f.ElementHandle.EntityToken);
                UserPerspectiveFacade.SetEntityTokens(userName, perspectiveEntityTokens);
            }

            foreach (CultureInfo cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures)
            {
                UserSettings.AddActiveLocaleCultureInfo(userName, cultureInfo);

                if (Core.Localization.LocalizationFacade.IsDefaultLocale(cultureInfo))                        
                {
                    UserSettings.SetCurrentActiveLocaleCultureInfo(userName, cultureInfo);                            
                    UserSettings.SetForeignLocaleCultureInfo(userName, cultureInfo);
                }
            }
        }
	}
}
