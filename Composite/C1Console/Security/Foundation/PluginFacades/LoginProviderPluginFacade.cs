using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Events;
using Composite.C1Console.Security.Plugins.LoginProvider;
using Composite.C1Console.Security.Plugins.LoginProvider.Runtime;


namespace Composite.C1Console.Security.Foundation.PluginFacades
{
    internal class LoginProviderPluginFacade
    {
        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitializeResources);



        static LoginProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }



        public static IEnumerable<string> AllUsernames
        {
            get
            {
                return _resourceLocker.Resources.Plugin.AllUsernames;
            }
        }


        public static bool CanSetUserPassword
        {
            get
            {
                return _resourceLocker.Resources.Plugin.CanSetUserPassword;
            }
        }


        public static bool CanAddNewUser
        {
            get
            {
                return _resourceLocker.Resources.Plugin.CanAddNewUser;
            }
        }


        public static bool UsersExists
        {
            get
            {
                return _resourceLocker.Resources.Plugin.UsersExists;
            }
        }


        public static LoginResult FormValidateUser(string userName, string password)
        {
            var validator = _resourceLocker.Resources.Plugin as IFormLoginProvider;

            return validator.Validate(userName, password);
        }


        public static void FormSetUserPassword(string userName, string password)
        {
            var validator = _resourceLocker.Resources.Plugin as IFormLoginProvider;

            validator.SetUserPassword(userName, password);
        }


        public static void FormAddNewUser(string userName, string password, string group, string email)
        {
            var validator = _resourceLocker.Resources.Plugin as IFormLoginProvider;

            Verify.That(validator.CanAddNewUser, "Login provider does not support adding users");

            validator.AddNewUser(userName, password, group, email);
        }


        public static bool WindowsValidateUser(string userName, string domainName)
        {
            var validator = _resourceLocker.Resources.Plugin as IWindowsLoginProvider;

            return validator.Validate(userName, domainName);
        }


        /// <summary>
        /// Returns a Type object containing the type of the current plugin
        /// </summary>
        /// <returns></returns>
        public static bool CheckType<T>()
        {
            return _resourceLocker.Resources.Plugin is T;
        }



        public static Type GetValidationPluginType()
        {
            return _resourceLocker.Resources.Plugin.GetType();
        }



        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", LoginProviderSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public LoginProviderFactory Factory { get; set; }
            public ILoginProvider Plugin { get; set; }

            public static void DoInitializeResources(Resources resources)
            {
                try
                {
                    resources.Factory = new LoginProviderFactory();
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
        }
    }
}