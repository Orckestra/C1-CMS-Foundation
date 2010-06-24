using System;
using System.Collections.Generic;
using System.Configuration;
using System.Xml;
using Composite.Actions;
using Composite.Collections.Generic;
using Composite.Elements.Plugins.ElementProvider;
using Composite.Elements.Plugins.ElementProvider.Runtime;
using Composite.EventSystem;
using Composite.Security;


namespace Composite.Elements.Foundation.PluginFacades
{
    internal static class ElementProviderPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static ElementProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IEnumerable<Element> GetRoots(string providerName, SearchToken seachToken)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            IEnumerable<Element> roots = GetElementProvider(providerName).GetRoots(seachToken);

            if (roots == null) return new List<Element>();

            return roots;
        }



        public static IEnumerable<Element> GetChildren(string providerName, EntityToken entityToken, SearchToken seachToken)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            IEnumerable<Element> children = GetElementProvider(providerName).GetChildren(entityToken, seachToken);

            if (children == null) return new List<Element>();

            return children;
        }



        public static IEnumerable<LabeledProperty> GetLabeledProperties(string providerName, EntityToken entityToken)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            ILabeledPropertiesElementProvider labledElementProvider = GetElementProvider(providerName) as ILabeledPropertiesElementProvider;
            if (labledElementProvider == null) throw new ArgumentException(string.Format("The Element Provider identified by the specified provider name does not implement {0}", typeof(ILabeledPropertiesElementProvider)));


            IEnumerable<LabeledProperty> properties = labledElementProvider.GetLabeledProperties(entityToken);

            if (properties == null) return new List<LabeledProperty>();

            return properties;
        }



#pragma warning disable 612
        public static List<EntityTokenHook> GetHooks(string providerName)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            IElementProvider provider = GetElementProvider(providerName) as IElementProvider;
            if (provider == null) throw new ArgumentException(string.Format("The Element Provider identified by the specified provider name does not implement {0}", typeof(IElementProvider)));


            List<EntityTokenHook> hooks = provider.GetHooks();

            if (hooks == null) return new List<EntityTokenHook>();

            return hooks;
        }
#pragma warning restore 612



        public static bool ContainsLocalizedData(string providerName)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            ILocaleAwareElementProvider provider = GetElementProvider(providerName) as ILocaleAwareElementProvider;
            if (provider == null) throw new ArgumentException(string.Format("The Element Provider identified by the specified provider name does not implement {0}", typeof(ILocaleAwareElementProvider)));

            return provider.ContainsLocalizedData;
        }



        public static IEnumerable<Element> GetForeignRoots(string providerName, SearchToken seachToken)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            ILocaleAwareElementProvider provider = GetElementProvider(providerName) as ILocaleAwareElementProvider;
            if (provider == null) throw new ArgumentException(string.Format("The Element Provider identified by the specified provider name does not implement {0}", typeof(ILocaleAwareElementProvider)));

            return provider.GetForeignRoots(seachToken);
        }



        public static IEnumerable<Element> GetForeignChildren(string providerName, EntityToken entityToken, SearchToken seachToken)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            ILocaleAwareElementProvider provider = GetElementProvider(providerName) as ILocaleAwareElementProvider;
            if (provider == null) throw new ArgumentException(string.Format("The Element Provider identified by the specified provider name does not implement {0}", typeof(ILocaleAwareElementProvider)));

            return provider.GetForeignChildren(entityToken, seachToken);
        }



        public static IEnumerable<LabeledProperty> GetForeignLabeledProperties(string providerName, EntityToken entityToken)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            ILocaleAwareLabeledPropertiesElementProvider provider = GetElementProvider(providerName) as ILocaleAwareLabeledPropertiesElementProvider;
            if (provider == null) throw new ArgumentException(string.Format("The Element Provider identified by the specified provider name does not implement {0}", typeof(ILocaleAwareElementProvider)));

            return provider.GetForeignLabeledProperties(entityToken);
        }



        public static object GetData(string providerName, string dataName)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (string.IsNullOrEmpty(dataName) == true) throw new ArgumentNullException("dataName");

            IDataExchangingElementProvider provider = GetElementProvider(providerName) as IDataExchangingElementProvider;
            if (provider == null) throw new ArgumentException(string.Format("The Element Provider identified by the specified provider name does not implement {0}", typeof(IDataExchangingElementProvider)));

            return provider.GetData(dataName);
        }



        public static bool GetNewSearchToken(string providerName, EntityToken entityToken, out SearchToken searchToken)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            ICustomSearchElementProvider provider = GetElementProvider(providerName) as ICustomSearchElementProvider;

            if (provider == null)
            {
                searchToken = null;
                return false;
            }

            searchToken = provider.GetNewSearchToken(entityToken);
            return true;
        }



        public static bool GetSearchFormDefinition(string providerName, EntityToken entityToken, out XmlReader formDefinition)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            ICustomSearchElementProvider provider = GetElementProvider(providerName) as ICustomSearchElementProvider;

            if (provider == null)
            {
                formDefinition = null;
                return false;
            }

            formDefinition = provider.GetSearchFormDefinition(entityToken);
            return true;
        }



        public static bool GetSearchFormBindings(string providerName, EntityToken entityToken, out Dictionary<string, object> bindings)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (entityToken == null) throw new ArgumentNullException("entityToken");

            ICustomSearchElementProvider provider = GetElementProvider(providerName) as ICustomSearchElementProvider;

            if (provider == null)
            {
                bindings = null;
                return false;
            }

            bindings = provider.GetSearchFormBindings(entityToken);

            return true;
        }



        public static bool OnElementDraggedAndDropped(string providerName, EntityToken draggedEntityToken, EntityToken newParentEntityToken, int dropIndex, DragAndDropType dragAndDropType, FlowControllerServicesContainer draggedElementFlowControllerServicesContainer)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");
            if (draggedEntityToken == null) throw new ArgumentNullException("draggedEntityToken");
            if (newParentEntityToken == null) throw new ArgumentNullException("newParentEntityToken");
            if (draggedElementFlowControllerServicesContainer == null) throw new ArgumentNullException("draggedElementFlowControllerServicesContainer");

            IDragAndDropElementProvider provider = GetElementProvider(providerName) as IDragAndDropElementProvider;
            if (provider == null) throw new ArgumentException(string.Format("The Element Provider identified byu the specified provider name does not implement {0}", typeof(IDragAndDropElementProvider)));

            return provider.OnElementDraggedAndDropped(draggedEntityToken, newParentEntityToken, dropIndex, dragAndDropType, draggedElementFlowControllerServicesContainer);
        }



        public static bool IsLocaleAwareElementProvider(string providerName)
        {
            ILocaleAwareElementProvider elementProvider = GetElementProvider(providerName) as ILocaleAwareElementProvider;

            return elementProvider != null;
        }



        private static IHooklessElementProvider GetElementProvider(string providerName)
        {
            IHooklessElementProvider provider;

            if (_resourceLocker.Resources.ProviderCache.TryGetValue(providerName, out provider) == false)
            {
                try
                {
                    if (ElementProviderRegistry.IsProviderHookingProvider(providerName) == true)
                    {
                        provider = _resourceLocker.Resources.Factory.Create(providerName);
                    }
                    else
                    {
                        provider = _resourceLocker.Resources.HooklessFactory.Create(providerName);
                    }

                    provider.Context = new ElementProviderContext(providerName);

                    using (_resourceLocker.Locker)
                    {
                        if (_resourceLocker.Resources.ProviderCache.ContainsKey(providerName) == false)
                        {
                            _resourceLocker.Resources.ProviderCache.Add(providerName, provider);
                        }
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

            return provider;
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

            throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration.", ElementProviderSettings.SectionName), ex);
        }



        private sealed class Resources
        {
            public ElementProviderFactory Factory { get; set; }
            public HooklessElementProviderFactory HooklessFactory { get; set; }

            public Dictionary<string, IHooklessElementProvider> ProviderCache { get; set; }

            public static void Initialize(Resources resources)
            {
                try
                {
                    resources.Factory = new ElementProviderFactory();
                    resources.HooklessFactory = new HooklessElementProviderFactory();
                }
                catch (NullReferenceException ex)
                {
                    HandleConfigurationError(ex);
                }
                catch (ConfigurationErrorsException ex)
                {
                    HandleConfigurationError(ex);
                }

                resources.ProviderCache = new Dictionary<string, IHooklessElementProvider>();
            }
        }
    }
}
