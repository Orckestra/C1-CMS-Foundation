using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.C1Console.Actions;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Events;
using Composite.C1Console.Forms.Flows.Plugins.UiContainerFactory;
using Composite.C1Console.Forms.Flows.Plugins.UiContainerFactory.Runtime;


namespace Composite.C1Console.Forms.Flows.Foundation.PluginFacades
{
    internal static class UiContainerFactoryFactoryPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static UiContainerFactoryFactoryPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IUiContainer CreateContainer(IFormChannelIdentifier channel, IFlowUiContainerType flowUiContainerType)
        {
            string compositeName = string.Format("{0}->{1}", channel.ChannelName, flowUiContainerType.ContainerName);

            IUiContainerFactory containerFactory;

            if (_resourceLocker.Resources.ContainerfactoryCache.TryGetValue(compositeName, out containerFactory) == false)
            {
                try
                {
                    containerFactory = _resourceLocker.Resources.Factory.Create(compositeName);

                    using (_resourceLocker.Locker)
                    {
                        if (_resourceLocker.Resources.ContainerfactoryCache.ContainsKey(compositeName) == false)
                            _resourceLocker.Resources.ContainerfactoryCache.Add(compositeName, containerFactory);
                    }
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


            return containerFactory.CreateContainer();
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

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", UiContainerFactorySettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public UiContainerFactoryFactory Factory { get; set; }
            public Dictionary<string, IUiContainerFactory> ContainerfactoryCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new UiContainerFactoryFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }


                resources.ContainerfactoryCache = new Dictionary<string, IUiContainerFactory>();
            }
        }
    }
}
