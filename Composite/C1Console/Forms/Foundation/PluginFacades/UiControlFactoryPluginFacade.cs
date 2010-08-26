using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.C1Console.Events;
using Composite.C1Console.Forms.Plugins.UiControlFactory;
using Composite.C1Console.Forms.Plugins.UiControlFactory.Runtime;


namespace Composite.C1Console.Forms.Foundation.PluginFacades
{
    internal static class UiControlFactoryPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static UiControlFactoryPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }


        public static IUiControl CreateControl(IFormChannelIdentifier channel, string namespaceName, string name)
        {
            string compositeName = string.Format("{0}->{1}->{2}", channel.ChannelName, namespaceName, name);

            if (false == _resourceLocker.Resources.FactoryCache.ContainsKey(compositeName))
            {
                try
                {
                    IUiControlFactory uiControlFactory = _resourceLocker.Resources.Factory.Create(compositeName);                    

                    using (_resourceLocker.Locker)
                    {
                        if (_resourceLocker.Resources.FactoryCache.ContainsKey(compositeName) == false)
                        {
                            _resourceLocker.Resources.FactoryCache.Add(compositeName, uiControlFactory);
                        }
                    }
                }
                catch (ArgumentException ex)
                {
                    HandleControlConfigurationError(ex, compositeName);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleControlConfigurationError(ex, compositeName);
                }
            }


            IUiControlFactory factory = _resourceLocker.Resources.FactoryCache[compositeName];
            IUiControl control = factory.CreateControl();
            control.UiControlChannel = channel;
            return control;
        }


        public static void GetDebugControlName(IFormChannelIdentifier channel, out string debugControlNamespace, out string debugControlName)
        {
            if (null == ConfigurationServices.ConfigurationSource)
            {
                throw new ConfigurationErrorsException("Missing configuration");
            }


            UiControlFactorySettings settings = ConfigurationServices.ConfigurationSource.GetSection(UiControlFactorySettings.SectionName) as UiControlFactorySettings;
            if (null == settings)
            {
                throw new ConfigurationErrorsException(string.Format("The configuration section '{0}' was not found in the configuration", UiControlFactorySettings.SectionName));
            }


            try
            {
                debugControlNamespace = settings.Channels[channel.ChannelName].DebugControlNamespace;
                debugControlName = settings.Channels[channel.ChannelName].DebugControlName;
            }
            catch (Exception e)
            {
                throw new ConfigurationErrorsException(string.Format("The channel {0} is missing from the configuration", channel.ChannelName), e);
            }
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

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", UiControlFactorySettings.SectionName), ex);
        }



        private static void HandleControlConfigurationError(Exception ex, string controlCompositeName)
        {
            Flush();

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration for IUiControlFactory '{0}'.", controlCompositeName), ex);
        }



        private sealed class Resources
        {
            public UiControlFactoryFactory Factory { get; set; }
            public Dictionary<string, IUiControlFactory> FactoryCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new UiControlFactoryFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.FactoryCache = new Dictionary<string, IUiControlFactory>();
            }
        }
    }
}
