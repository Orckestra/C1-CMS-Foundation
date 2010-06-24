using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Transactions;
using Composite.Caching;
using Composite.Data.Foundation;
using Composite.Data.ProcessControlled.ProcessControllers.DummyProcessControllers;
using Composite.Elements;
using Composite.EventSystem;
using Composite.Logging;
using Composite.Transactions;
using Composite.Types;
using Composite.Linq;


namespace Composite.Data.ProcessControlled
{
    public static class ProcessControllerFacade
    {
        private static Dictionary<Type, Type> _controlledTypes = new Dictionary<Type, Type>();

        private static Dictionary<Type, IProcessController> _processControllers;
        private static Dictionary<Type, List<IPublishControlledAuxiliary>> _publishControlledAuxiliaries = new Dictionary<Type, List<IPublishControlledAuxiliary>>();

        private static object _lock = new object();


        static ProcessControllerFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);

            _controlledTypes.Add(typeof(IPublishControlled), typeof(IPublishProcessController));
            _controlledTypes.Add(typeof(ILocalizedControlled), typeof(ILocalizeProcessController));
        }




        /// <summary>
        /// This method will delete the data, and its if the exists its versions and publications
        /// </summary>
        /// <param name="data"></param>
        public static void FullDelete(IData data)
        {
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                using (DataScope adminDataScope = new DataScope(DataScopeIdentifier.Administrated))
                {
                    if (data is IPublishControlled)
                    {
                        using (DataScope dataScope = new DataScope(DataScopeIdentifier.Public))
                        {                        
                            IEnumerable<IData> datasDelete = DataFacade.GetDataFromOtherScope(data, DataScopeIdentifier.Public).Evaluate();
                        
                            DataFacade.Delete(datasDelete, CascadeDeleteType.Disable);
                        }
                    }

                    DataFacade.Delete(data);
                }

                transactionScope.Complete();
            }
        }



        /// <summary>
        /// This method return the types that implements the same IProcessControlled interfaces as
        /// the targetType.
        /// </summary>
        /// <param name="targetType"></param>
        /// <param name="types"></param>
        /// <returns></returns>
        public static IEnumerable<Type> GetProcessControlledTypes(Type targetType, IEnumerable<Type> types)
        {
            if (targetType == null) throw new ArgumentNullException("targetType");
            if (types == null) throw new ArgumentNullException("types");

            List<Type> compatibleTypes = new List<Type>();

            foreach (Type type in types)
            {
                foreach (Type processControledType in _controlledTypes.Keys)
                {
                    if ((compatibleTypes.Contains(type) == false) &&
                        (processControledType.IsAssignableFrom(targetType) == true) &&
                        (processControledType.IsAssignableFrom(type) == true))
                    {
                        compatibleTypes.Add(type);
                    }
                }
            }

            return compatibleTypes;
        }




        public static List<ElementAction> GetActions(IData data, Type elementProviderType)
        {
            if (data == null) throw new ArgumentNullException("data");
            if (elementProviderType == null) throw new ArgumentNullException("elementProviderType");

            List<ElementAction> actions = new List<ElementAction>();

            Dictionary<Type, Type> processControllerTypes = ProcessControllerRegistry.GetProcessControllerTypes(data.DataSourceId.InterfaceType);

            foreach (Type processControllerType in processControllerTypes.Values)
            {
                IProcessController processController = _processControllers[processControllerType];

                List<ElementAction> acts = processController.GetActions(data, elementProviderType);

                if (acts != null)
                {
                    actions.AddRange(acts);
                }
            }

            return actions;
        }


        #region IPublishControlled methods
        public static void SetStartStatus(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            IPublishProcessController controller = GetProcessController<IPublishProcessController>(data.DataSourceId.InterfaceType);

            if (controller == null) throw new ArgumentException(string.Format("The type '{0}' is not registred process controller", data.DataSourceId.InterfaceType));

            controller.SetStartStatus(data);
        }



        public static IDictionary<string, string> GetValidTransitions(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            IPublishProcessController controller = GetProcessController<IPublishProcessController>(data.DataSourceId.InterfaceType);

            if (controller == null) throw new ArgumentException(string.Format("The type '{0}' is not registred process controller", data.DataSourceId.InterfaceType));

            return controller.GetValidTransitions(data);
        }



        public static void ValidateTransition(IData data, string status)
        {
            if (data == null) throw new ArgumentNullException("data");

            IPublishProcessController controller = GetProcessController<IPublishProcessController>(data.DataSourceId.InterfaceType);

            if (controller == null) throw new ArgumentException(string.Format("The type '{0}' is not registred process controller", data.DataSourceId.InterfaceType));

            controller.ValidateTransition(data, status);
        }
        #endregion
       


        public static Type GetProcessControllerType<T>(IData data)
            where T : class, IProcessController
        {
            if (data == null) throw new ArgumentNullException("data");

            T controller = GetProcessController<T>(data.DataSourceId.InterfaceType);

            if (controller == null) throw new ArgumentException(string.Format("The type '{0}' is not registred process controller", data.DataSourceId.InterfaceType));

            return controller.GetType();
        }



        public static IDisposable NoProcessControllers
        {
            get
            {
                return new NoProcessControllersDisposable();
            }
        }


        private static void OnAfterDataUpdated(DataEventArgs dataEventArgs)
        {
            if (GetProcessControllersCounter() > 0) return;

            if (dataEventArgs.Data is IPublishControlled)
            {
                IPublishProcessController controller = GetProcessController<IPublishProcessController>(dataEventArgs.Data.DataSourceId.InterfaceType);

                if (controller != null)
                {
                    bool callAuxilaries = controller.OnAfterDataUpdated(dataEventArgs.Data);

                    if (callAuxilaries == true)
                    {
                        IEnumerable<IPublishControlledAuxiliary> publishControlledAuxiliaries = GetPublishControlledAuxiliaries(dataEventArgs.DataType);

                        foreach (IPublishControlledAuxiliary publishControlledAuxiliary in publishControlledAuxiliaries)
                        {
                            publishControlledAuxiliary.OnAfterDataUpdated(dataEventArgs.Data);
                        }
                    }
                }
            }
        }



        private static void OnDataBuildNew(DataEventArgs dataEventArgs)
        {
            if (GetProcessControllersCounter() > 0) return;

            if (dataEventArgs.Data is IPublishControlled)
            {
                IPublishProcessController controller = GetProcessController<IPublishProcessController>(dataEventArgs.Data.DataSourceId.InterfaceType);

                if (controller != null)
                {
                    bool callAuxilaries = controller.OnAfterBuildNew(dataEventArgs.Data);

                    if (callAuxilaries == true)
                    {
                        IEnumerable<IPublishControlledAuxiliary> publishControlledAuxiliaries = GetPublishControlledAuxiliaries(dataEventArgs.DataType);

                        foreach (IPublishControlledAuxiliary publishControlledAuxiliary in publishControlledAuxiliaries)
                        {
                            publishControlledAuxiliary.OnAfterDataUpdated(dataEventArgs.Data);
                        }
                    }
                }
            }

            if (dataEventArgs.Data is ILocalizedControlled)
            {
                ILocalizeProcessController controller = GetProcessController<ILocalizeProcessController>(dataEventArgs.Data.DataSourceId.InterfaceType);

                if (controller != null)
                {
                    controller.OnAfterBuildNew(dataEventArgs.Data);
                }
            }
        }



        private static T GetProcessController<T>(Type dataType)
            where T : class, IProcessController
        {
            Dictionary<Type, Type> processControllerTypes = ProcessControllerRegistry.GetProcessControllerTypes(dataType);

            Type type;
            if (processControllerTypes.TryGetValue(typeof(T), out type) == false)
            {
                return null;
            }

            return (T)_processControllers[type];
        }



        private static IEnumerable<IPublishControlledAuxiliary> GetPublishControlledAuxiliaries(Type dataType)
        {
            List<IPublishControlledAuxiliary> publishControlledAuxiliaries;

            if (_publishControlledAuxiliaries.TryGetValue(dataType, out publishControlledAuxiliaries) == false)
            {
                List<PublishControlledAuxiliaryAttribute> attributes = dataType.GetCustomAttributesRecursively<PublishControlledAuxiliaryAttribute>().ToList();

                publishControlledAuxiliaries = new List<IPublishControlledAuxiliary>();

                foreach (PublishControlledAuxiliaryAttribute attribute in attributes)
                {
                    if (attribute.PublishControlledAuxiliaryType == null) throw new InvalidOperationException(string.Format("The PublishControlledAuxiliaryType may not be null on the {0}", typeof(PublishControlledAuxiliaryAttribute)));
                    if (typeof(IPublishControlledAuxiliary).IsAssignableFrom(attribute.PublishControlledAuxiliaryType) == false) throw new InvalidOperationException(string.Format("The {0} does not inheret the interface {1} the {2}", attribute.PublishControlledAuxiliaryType, typeof(IPublishControlledAuxiliary), typeof(PublishControlledAuxiliaryAttribute)));

                    ConstructorInfo constructorInfo = attribute.PublishControlledAuxiliaryType.GetConstructor(new Type[] { });
                    if (constructorInfo == null) throw new InvalidOperationException(string.Format("The type {0} used by the {1} does not have a default contructor", attribute.PublishControlledAuxiliaryType, typeof(PublishControlledAuxiliaryAttribute)));

                    IPublishControlledAuxiliary publishControlledAuxiliary = (IPublishControlledAuxiliary)Activator.CreateInstance(attribute.PublishControlledAuxiliaryType, new object[] { });

                    publishControlledAuxiliaries.Add(publishControlledAuxiliary);
                }

                _publishControlledAuxiliaries.Add(dataType, publishControlledAuxiliaries);
            }

            foreach (IPublishControlledAuxiliary publishControlledAuxiliary in publishControlledAuxiliaries)
            {
                yield return publishControlledAuxiliary;
            }
        }



        private static Type MapProcessControlledTypeToProcessControllerType(Type processControlledType)
        {
            return _controlledTypes[processControlledType];
        }



        internal static void Initialize_PostDynamic()
        {
            if (RuntimeInformation.IsDebugBuild == true)
            {
                GlobalInitializerFacade.ValidateIsOnlyCalledFromGlobalInitializerFacade(new StackTrace());
            }

            DoInitialize();
        }



        private static void DoInitialize()
        {
            _processControllers = new Dictionary<Type, IProcessController>();

            foreach (Type processControllerType in ProcessControllerRegistry.ProcessControllerTypes)
            {
                IProcessController processController = (IProcessController)Activator.CreateInstance(processControllerType);

                _processControllers.Add(processControllerType, processController);
            }


            foreach (Type interfaceType in ProcessControllerRegistry.DataTypesWithProcessControllers)
            {
                Dictionary<Type, Type> processControllerTypes = ProcessControllerRegistry.GetProcessControllerTypes(interfaceType);

                foreach (var kvp in processControllerTypes)
                {
                    LoggingService.LogVerbose("ProcessControllerFacade", string.Format("'{0}' process controller ('{1}') added to data type '{2}'", kvp.Value, kvp.Key, interfaceType));
                }
            }

            if (RuntimeInformation.IsUnittest == false)
            {
                foreach (Type dataType in DataFacade.GetAllInterfaces())
                {
                    Dictionary<Type, Type> processControllerTypes = ProcessControllerRegistry.GetProcessControllerTypes(dataType);

                    foreach (var kvp in _controlledTypes)
                    {
                        if (kvp.Key.IsAssignableFrom(dataType) == true)
                        {
                            if (processControllerTypes.ContainsKey(kvp.Value) == false)
                            {
                                throw new InvalidOperationException(string.Format("The data type {0} is inheriting the interface {1} but has not been assigned a {2} process controller", dataType, kvp.Key, kvp.Value));
                            }
                        }
                    }
                }
            }

            DataEventSystemFacade.SubscribeToDataAfterUpdate<IProcessControlled>(OnAfterDataUpdated);
            DataEventSystemFacade.SubscribeToDataAfterBuildNew<IProcessControlled>(OnDataBuildNew);
        }



        private static void Flush()
        {
            _processControllers = null;
            _publishControlledAuxiliaries = new Dictionary<Type, List<IPublishControlledAuxiliary>>();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private static void PushProcessControllers()
        {
            ProcessControllersCounter.Counter++;
        }



        private static void PopProcessControllers()
        {
            ProcessControllersCounter.Counter--;
        }



        private static int GetProcessControllersCounter()
        {
            return ProcessControllersCounter.Counter;
        }



        private sealed class NoProcessControllersDisposable : IDisposable
        {
            public NoProcessControllersDisposable()
            {
                ProcessControllerFacade.PushProcessControllers();
            }

            public void Dispose()
            {
                ProcessControllerFacade.PopProcessControllers();
            }
        }



        private sealed class CounterContainer
        {
            public CounterContainer()
            {
                this.Counter = 0;
            }

            public int Counter { get; set; }
        }


        // Using thread statis because the request life time cache does not work if a non-asp.net is the invoker /MRJ
        [ThreadStatic]
        private static CounterContainer _counterContainer = null;


        private static CounterContainer ProcessControllersCounter
        {
            get
            {
                if (_counterContainer == null)
                {
                    _counterContainer = new CounterContainer();
                }

                return _counterContainer;
                //CounterContainer counterContainer = RequestLifetimeCache.TryGet<CounterContainer>("ProcessControllerFacade:ProcessControllersCounter");
                //if (counterContainer == null)
                //{
                //    counterContainer = new CounterContainer();
                //    RequestLifetimeCache.Add("ProcessControllerFacade:ProcessControllersCounter", counterContainer);
                //}

                //return counterContainer;
            }
        }
    }
}
