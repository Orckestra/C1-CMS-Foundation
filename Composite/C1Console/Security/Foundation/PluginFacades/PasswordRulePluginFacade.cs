using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Composite.C1Console.Security.Plugins.PasswordPolicy;
using Composite.C1Console.Security.Plugins.PasswordPolicy.Runtime;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.Data.Types;


namespace Composite.C1Console.Security.Foundation.PluginFacades
{
    internal static class PasswordRulePluginFacade
    {
        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.DoInitializeResources);


        static PasswordRulePluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }

        /// <summary>
        /// Validates the password against the rules defined in the configuration.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="password"></param>
        /// <param name="validationMessages"></param>
        /// <returns></returns>
        public static bool ValidatePassword(IUser user, string password, out IList<string> validationMessages)
        {
            bool isValid = true;
            validationMessages = new List<string>();

            foreach (var rule in _resourceLocker.Resources.PasswordRules)
            {
                if (!rule.ValidatePassword(user, password))
                {
                    isValid = false;
                    validationMessages.Add(rule.GetRuleDescription());
                }
            }

            return isValid;
        }

        public static int PasswordExpirationTimeInDays
        {
            get
            {
                var settings = GetSettings();
                return settings?.PasswordExpirationTimeInDays ?? 0;
            }
        }

        public static int PasswordHistoryLength
        {
            get
            {
                var settings = GetSettings();
                return settings?.PasswordHistoryLength ?? 0;
            }
        }
        
        private static PasswordPolicySettings GetSettings()
        {
            var configuration = ConfigurationServices.ConfigurationSource;

            return configuration?.GetSection(PasswordPolicySettings.SectionName) as PasswordPolicySettings;
        }


        public static bool HasConfiguration()
        {
            return GetSettings() != null;
        }


        private static void Flush()
        {
            _resourceLocker.ResetInitialization();
        }



        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException($"Failed to load the configuration section '{PasswordPolicySettings.SectionName}' from the configuration.", ex);
        }



        private sealed class Resources
        {
            PasswordRuleFactory Factory { get; set; }
            public IReadOnlyCollection<IPasswordRule> PasswordRules { get; private set; }

            public static void DoInitializeResources(Resources resources)
            {
                var settings = GetSettings();
                if (settings == null)
                {
                    Log.LogWarning(nameof(PasswordRulePluginFacade), $"Composite.config is missing '{PasswordPolicySettings.SectionName}' section");
                    resources.PasswordRules = new IPasswordRule[0];
                    return;
                }

                try
                {
                    var factory = resources.Factory = new PasswordRuleFactory();
                    var rules = settings.PasswordRules.Select(passwordRuleData => factory.Create(passwordRuleData.Name)).ToList();

                    resources.PasswordRules = rules;
                }
                catch (Exception ex)
                {
                    if (!(ex is ArgumentException) && !(ex is ConfigurationErrorsException)) throw;

                    HandleConfigurationError(ex);
                }
            }
        }
    }
}
