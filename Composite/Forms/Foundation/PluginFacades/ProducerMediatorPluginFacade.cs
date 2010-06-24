using System;
using System.Collections.Generic;
using System.Configuration;
using Composite.Collections.Generic;
using Composite.EventSystem;
using Composite.Forms.Plugins.ProducerMediator;
using Composite.Forms.Plugins.ProducerMediator.Runtime;


namespace Composite.Forms.Foundation.PluginFacades
{
    internal static class ProducerMediatorPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static ProducerMediatorPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }


        public static object CreateProducer(IFormChannelIdentifier channel, string namespaceName, string name)
        {
                return GetProducerMediator(namespaceName).CreateProducer(channel, namespaceName, name);
        }


        public static object EvaluateProducer(string namespaceName, object producer)
        {
                return GetProducerMediator(namespaceName).EvaluateProducer(producer);
        }


        private static IProducerMediator GetProducerMediator(string namespaceName)
        {
            if (false == _resourceLocker.Resources.ProducerMediators.ContainsKey(namespaceName))
            {
                try
                {
                    IProducerMediator producerMediator = _resourceLocker.Resources.Factory.Create(namespaceName);

                    using (_resourceLocker.Locker)
                    {
                        if (_resourceLocker.Resources.ProducerMediators.ContainsKey(namespaceName) == false)
                            _resourceLocker.Resources.ProducerMediators.Add(namespaceName, producerMediator);
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

            return _resourceLocker.Resources.ProducerMediators[namespaceName];
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

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", ProducerMediatorSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public ProducerMediatorFactory Factory { get; set; }
            public Dictionary<string, IProducerMediator> ProducerMediators { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new ProducerMediatorFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.ProducerMediators = new Dictionary<string, IProducerMediator>();
            }
        }
    }
}
