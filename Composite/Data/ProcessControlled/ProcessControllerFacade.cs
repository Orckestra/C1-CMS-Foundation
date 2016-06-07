using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using Composite.Core.Caching;
using Composite.Core.Collections.Generic;
using Composite.Data.Foundation;
using Composite.C1Console.Elements;
using Composite.C1Console.Events;
using Composite.Data.Transactions;
using Composite.Core.Types;
using Composite.Core.Linq;


namespace Composite.Data.ProcessControlled
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class ProcessControllerFacade
    {
        private static readonly Dictionary<Type, Type> _controlledTypes = new Dictionary<Type, Type>();

        private static Dictionary<Type, IProcessController> _processControllers;
        private static Hashtable<Type, List<IPublishControlledAuxiliary>> _publishControlledAuxiliaries = new Hashtable<Type, List<IPublishControlledAuxiliary>>();


        static ProcessControllerFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());

            _controlledTypes.Add(typeof(IPublishControlled), typeof(IPublishProcessController));
            _controlledTypes.Add(typeof(ILocalizedControlled), typeof(ILocalizeProcessController));
        }




        /// <summary>
        /// This method will delete the data, and its if the exists its versions and publications
        /// </summary>
        /// <param name="data"></param>
        public static void FullDelete(IData data)
        {
            FullDelete(new[] {data});
        }


        internal static void FullDelete(IEnumerable<IData> dataset)
        {
            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                foreach (var data in dataset)
                {
                    if (data is IPublishControlled)
                    {
                        using (new DataScope(DataScopeIdentifier.Public))
                        {
                            IEnumerable<IData> datasDelete = DataFacade.GetDataFromOtherScope(data, DataScopeIdentifier.Public).Evaluate();

                            DataFacade.Delete(datasDelete, CascadeDeleteType.Disable);
                        }
                    }

                    using (new DataScope(DataScopeIdentifier.Administrated))
                    {
                        DataFacade.Delete(data);
                    }
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
                    if (!compatibleTypes.Contains(type) &&
                        processControledType.IsAssignableFrom(targetType) &&
                        processControledType.IsAssignableFrom(type))
                    {
                        compatibleTypes.Add(type);
                    }
                }
            }

            return compatibleTypes;
        }




        /// <exclude />
        public static List<ElementAction> GetActions(IData data, Type elementProviderType)
        {
            if (data == null) throw new ArgumentNullException("data");
            if (elementProviderType == null) throw new ArgumentNullException("elementProviderType");

            var actions = new List<ElementAction>();

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
        /// <exclude />
        public static void SetStartStatus(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            IPublishProcessController controller = GetProcessController<IPublishProcessController>(data.DataSourceId.InterfaceType);

            if (controller == null) throw new ArgumentException(string.Format("The type '{0}' is not registred process controller", data.DataSourceId.InterfaceType));

            controller.SetStartStatus(data);
        }



        /// <exclude />
        public static IDictionary<string, string> GetValidTransitions(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            IPublishProcessController controller = GetProcessController<IPublishProcessController>(data.DataSourceId.InterfaceType);

            if (controller == null) throw new ArgumentException(string.Format("The type '{0}' is not registred process controller", data.DataSourceId.InterfaceType));

            return controller.GetValidTransitions(data);
        }



        /// <exclude />
        public static void ValidateTransition(IData data, string status)
        {
            if (data == null) throw new ArgumentNullException("data");

            IPublishProcessController controller = GetProcessController<IPublishProcessController>(data.DataSourceId.InterfaceType);

            if (controller == null) throw new ArgumentException(string.Format("The type '{0}' is not registred process controller", data.DataSourceId.InterfaceType));

            controller.ValidateTransition(data, status);
        }
        #endregion



        /// <exclude />
        public static Type GetProcessControllerType<T>(IData data)
            where T : class, IProcessController
        {
            if (data == null) throw new ArgumentNullException("data");

            T controller = GetProcessController<T>(data.DataSourceId.InterfaceType);

            if (controller == null) throw new ArgumentException(string.Format("The type '{0}' is not registred process controller", data.DataSourceId.InterfaceType));

            return controller.GetType();
        }



        /// <exclude />
        public static IDisposable NoProcessControllers
        {
            get
            {
                return new NoProcessControllersDisposable();
            }
        }


        private static void OnAfterDataUpdated(object sender, DataEventArgs dataEventArgs)
        {
            if (GetProcessControllersCounter() > 0) return;

            if (dataEventArgs.Data is IPublishControlled)
            {
                IPublishProcessController controller = GetProcessController<IPublishProcessController>(dataEventArgs.Data.DataSourceId.InterfaceType);

                if (controller != null)
                {
                    bool callAuxilaries = controller.OnAfterDataUpdated(dataEventArgs.Data);

                    if (callAuxilaries)
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



        private static void OnDataBuildNew(object sender, DataEventArgs dataEventArgs)
        {
            if (GetProcessControllersCounter() > 0) return;

            if (dataEventArgs.Data is IPublishControlled)
            {
                IPublishProcessController controller = GetProcessController<IPublishProcessController>(dataEventArgs.Data.DataSourceId.InterfaceType);

                if (controller != null)
                {
                    bool callAuxilaries = controller.OnAfterBuildNew(dataEventArgs.Data);

                    if (callAuxilaries)
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

            if (!_publishControlledAuxiliaries.TryGetValue(dataType, out publishControlledAuxiliaries))
            {
                lock (_publishControlledAuxiliaries)
                {
                    if (!_publishControlledAuxiliaries.TryGetValue(dataType, out publishControlledAuxiliaries))
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
                }
            }

            foreach (IPublishControlledAuxiliary publishControlledAuxiliary in publishControlledAuxiliaries)
            {
                yield return publishControlledAuxiliary;
            }
        }



        internal static void Initialize_PostDataTypes()
        {
            if (RuntimeInformation.IsDebugBuild)
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

            if (!RuntimeInformation.IsUnittest)
            {
                foreach (Type dataType in DataFacade.GetAllInterfaces())
                {
                    Dictionary<Type, Type> processControllerTypes = ProcessControllerRegistry.GetProcessControllerTypes(dataType);

                    foreach (var kvp in _controlledTypes)
                    {
                        if (kvp.Key.IsAssignableFrom(dataType))
                        {
                            if (!processControllerTypes.ContainsKey(kvp.Value))
                            {
                                throw new InvalidOperationException(string.Format("The data type {0} is inheriting the interface {1} but has not been assigned a {2} process controller", dataType, kvp.Key, kvp.Value));
                            }
                        }
                    }
                }
            }

            DataEventSystemFacade.SubscribeToDataAfterUpdate<IProcessControlled>(OnAfterDataUpdated, false);
            DataEventSystemFacade.SubscribeToDataAfterBuildNew<IProcessControlled>(OnDataBuildNew, false);
        }



        private static void Flush()
        {
            _processControllers = null;
            _publishControlledAuxiliaries = new Hashtable<Type, List<IPublishControlledAuxiliary>>();
        }



        private static int GetProcessControllersCounter()
        {
            return ProcessControllersCounter.Counter;
        }



        private sealed class NoProcessControllersDisposable : IDisposable
        {
            public NoProcessControllersDisposable()
            {
                ProcessControllersCounter.Counter++;
            }

            public void Dispose()
            {
                ProcessControllersCounter.Counter--;
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


        private static CounterContainer ProcessControllersCounter
        {
            get
            {
                return RequestLifetimeCache.GetCachedOrNew<CounterContainer>("ProcessControllerFacade:ProcessControllersCounter");
            }
        }
    }
}
