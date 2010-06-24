using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Elements.Plugins.ElementProvider.Runtime;
using Composite.ConfigurationSystem;


namespace Composite.Elements.Plugins.ElementProvider
{
    public sealed class ElementProviderConfigurationServices
    {
        public static HooklessElementProviderData GetElementProviderConfiguration(string providerName)
        {
            ElementProviderSettings settings = (ElementProviderSettings)ConfigurationServices.ConfigurationSource.GetSection(ElementProviderSettings.SectionName);
            
            if (settings.ElementProviderPlugins.Contains(providerName) == false) throw new ArgumentException("Unknown provider name", "providerName");
            
            return settings.ElementProviderPlugins.Get(providerName);
        }



        public static bool DeleteElementProviderConfiguration(string providerName)
        {
            ElementProviderSettings settings = (ElementProviderSettings)ConfigurationServices.ConfigurationSource.GetSection(ElementProviderSettings.SectionName);

            if (settings.ElementProviderPlugins.Contains(providerName) == true)
            {
                settings.ElementProviderPlugins.Remove(providerName);

                SaveElementProviderSettings(settings);

                return true;
            }

            return false;
        }



        public static void SaveElementProviderConfiguration(HooklessElementProviderData elementProviderData)
        {
            ElementProviderSettings settings = (ElementProviderSettings)ConfigurationServices.ConfigurationSource.GetSection(ElementProviderSettings.SectionName);

            SaveElementProviderSettings(settings, elementProviderData);
        }



        private static void SaveElementProviderSettings(ElementProviderSettings settings)
        {
            SaveElementProviderSettings(settings, null);
        }



        private static void SaveElementProviderSettings(ElementProviderSettings settings, HooklessElementProviderData elementProviderData)
        {
            ElementProviderSettings newSettings = new ElementProviderSettings();
            newSettings.RootProviderName = settings.RootProviderName;

            if (elementProviderData != null)
            {
                newSettings.ElementProviderPlugins.Add(elementProviderData);

                foreach (var plugin in settings.ElementProviderPlugins.Where(p => p.Name != elementProviderData.Name))
                {
                    newSettings.ElementProviderPlugins.Add(plugin);
                }
            }
            else
            {
                foreach (var plugin in settings.ElementProviderPlugins)
                {
                    newSettings.ElementProviderPlugins.Add(plugin);
                }
            }

            ConfigurationServices.SaveConfigurationSection(ElementProviderSettings.SectionName, newSettings);
        }
    }
}
