using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Xml;
using Composite.C1Console.Actions;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Elements.Plugins.ElementProvider.Runtime;
using Composite.C1Console.Events;
using Composite.C1Console.Security;


namespace Composite.C1Console.Elements.Foundation.PluginFacades
{
    internal static class ElementProviderPluginFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static ElementProviderPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }



        public static IEnumerable<Element> GetRoots(string providerName, SearchToken seachToken)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));

            IEnumerable<Element> roots = GetElementProvider(providerName).GetRoots(seachToken);

            return roots ?? Enumerable.Empty<Element>();
        }



        public static IEnumerable<Element> GetChildren(string providerName, EntityToken entityToken, SearchToken seachToken)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));
            Verify.ArgumentNotNull(entityToken, nameof(entityToken));

            IEnumerable<Element> children = GetElementProvider(providerName).GetChildren(entityToken, seachToken);

            return children ?? Enumerable.Empty<Element>();
        }



        public static IEnumerable<LabeledProperty> GetLabeledProperties(string providerName, EntityToken entityToken)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));
            Verify.ArgumentNotNull(entityToken, nameof(entityToken));

            ILabeledPropertiesElementProvider labledElementProvider = GetElementProvider(providerName) as ILabeledPropertiesElementProvider;
            if (labledElementProvider == null) throw new ArgumentException($"The Element Provider identified by the specified provider name does not implement {typeof(ILabeledPropertiesElementProvider)}");

            IEnumerable<LabeledProperty> properties = labledElementProvider.GetLabeledProperties(entityToken);

            return properties ?? Enumerable.Empty<LabeledProperty>();
        }



#pragma warning disable 612
        public static List<EntityTokenHook> GetHooks(string providerName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));

            IElementProvider provider = GetElementProvider(providerName) as IElementProvider;
            if (provider == null) throw new ArgumentException($"The Element Provider identified by the specified provider name does not implement {typeof(IElementProvider)}");


            List<EntityTokenHook> hooks = provider.GetHooks();

            return hooks ?? new List<EntityTokenHook>();
        }
#pragma warning restore 612



        public static bool ContainsLocalizedData(string providerName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));

            var provider = GetElementProvider(providerName) as ILocaleAwareElementProvider;
            if (provider == null) throw new ArgumentException($"The Element Provider identified by the specified provider name does not implement {typeof(ILocaleAwareElementProvider)}");

            return provider.ContainsLocalizedData;
        }



        public static IEnumerable<Element> GetForeignRoots(string providerName, SearchToken seachToken)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));

            ILocaleAwareElementProvider provider = GetElementProvider(providerName) as ILocaleAwareElementProvider;
            if (provider == null) throw new ArgumentException($"The Element Provider identified by the specified provider name does not implement {typeof(ILocaleAwareElementProvider)}");

            return provider.GetForeignRoots(seachToken);
        }



        public static IEnumerable<Element> GetForeignChildren(string providerName, EntityToken entityToken, SearchToken seachToken)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));
            Verify.ArgumentNotNull(entityToken, nameof(entityToken));

            var provider = GetElementProvider(providerName) as ILocaleAwareElementProvider;
            if (provider == null) throw new ArgumentException($"The Element Provider identified by the specified provider name does not implement {typeof(ILocaleAwareElementProvider)}");

            return provider.GetForeignChildren(entityToken, seachToken);
        }



        public static IEnumerable<LabeledProperty> GetForeignLabeledProperties(string providerName, EntityToken entityToken)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));

            ILocaleAwareLabeledPropertiesElementProvider provider = GetElementProvider(providerName) as ILocaleAwareLabeledPropertiesElementProvider;
            if (provider == null) throw new ArgumentException($"The Element Provider identified by the specified provider name does not implement {typeof(ILocaleAwareElementProvider)}");

            return provider.GetForeignLabeledProperties(entityToken);
        }



        public static object GetData(string providerName, string dataName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));
            Verify.ArgumentNotNullOrEmpty(dataName, nameof(dataName));

            IDataExchangingElementProvider provider = GetElementProvider(providerName) as IDataExchangingElementProvider;
            if (provider == null) throw new ArgumentException($"The Element Provider identified by the specified provider name does not implement {typeof(IDataExchangingElementProvider)}");

            return provider.GetData(dataName);
        }



        public static bool GetNewSearchToken(string providerName, EntityToken entityToken, out SearchToken searchToken)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));
            Verify.ArgumentNotNull(entityToken, nameof(entityToken));

            var provider = GetElementProvider(providerName) as ICustomSearchElementProvider;

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
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));
            Verify.ArgumentNotNull(entityToken, nameof(entityToken));

            var provider = GetElementProvider(providerName) as ICustomSearchElementProvider;

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
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));
            Verify.ArgumentNotNull(entityToken, nameof(entityToken));

            var provider = GetElementProvider(providerName) as ICustomSearchElementProvider;

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
            Verify.ArgumentNotNullOrEmpty(providerName, nameof(providerName));
            Verify.ArgumentNotNull(draggedEntityToken, nameof(draggedEntityToken));
            Verify.ArgumentNotNull(newParentEntityToken, nameof(newParentEntityToken));
            Verify.ArgumentNotNull(draggedElementFlowControllerServicesContainer, nameof(draggedElementFlowControllerServicesContainer));

            var provider = GetElementProvider(providerName) as IDragAndDropElementProvider;
            if (provider == null) throw new ArgumentException($"The Element Provider identified byu the specified provider name does not implement {typeof(IDragAndDropElementProvider)}");

            return provider.OnElementDraggedAndDropped(draggedEntityToken, newParentEntityToken, dropIndex, dragAndDropType, draggedElementFlowControllerServicesContainer);
        }



        public static bool IsLocaleAwareElementProvider(string providerName)
        {
            var elementProvider = GetElementProvider(providerName) as ILocaleAwareElementProvider;

            return elementProvider != null;
        }



        internal static IHooklessElementProvider GetElementProvider(string providerName)
        {
            IHooklessElementProvider provider;

            if (!_resourceLocker.Resources.ProviderCache.TryGetValue(providerName, out provider))
            {
                try
                {
                    if (ElementProviderRegistry.IsProviderHookingProvider(providerName))
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
                        if (!_resourceLocker.Resources.ProviderCache.ContainsKey(providerName))
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



        private static void HandleConfigurationError(Exception ex)
        {
            Flush();

            throw new ConfigurationErrorsException($"Failed to load the configuration section '{ElementProviderSettings.SectionName}' from the configuration.", ex);
        }



        private sealed class Resources
        {
            public ElementProviderFactory Factory { get; private set; }
            public HooklessElementProviderFactory HooklessFactory { get; private set; }

            public Dictionary<string, IHooklessElementProvider> ProviderCache { get; private set; }

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
