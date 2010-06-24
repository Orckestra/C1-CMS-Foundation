using System;
using System.Linq;
using System.Collections.Generic;
using Composite.Collections.Generic;
using Composite.ConfigurationSystem;
using Composite.EventSystem;
using Composite.Logging;
using Composite.Types;
using Composite.Data.Types;
using Composite.Data.ProcessControlled;


namespace Composite.Data.Foundation
{
    internal static class ProcessControllerRegistry
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static ProcessControllerRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IEnumerable<Type> ProcessControllerTypes
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    foreach (Type processControllerType in _resourceLocker.Resources.ProcessControllerTypes)
                    {
                        yield return processControllerType;
                    }
                }
            }
        }



        public static IEnumerable<Type> DataTypesWithProcessControllers
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    foreach (Type interfaceType in _resourceLocker.Resources.TypeToProcessControllerTypes.Keys)
                    {
                        yield return interfaceType;
                    }
                }
            }
        }



        public static Dictionary<Type, Type> GetProcessControllerTypes(Type interfaceType)
        {
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");

            using (_resourceLocker.ReadLocker)
            {
                Dictionary<Type, Type> processControllerTypes;

                if (_resourceLocker.Resources.TypeToProcessControllerTypes.TryGetValue(interfaceType, out processControllerTypes) == false)
                {
                    return new Dictionary<Type, Type>();
                }

                return processControllerTypes;
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



        private sealed class Resources
        {
            public List<Type> ProcessControllerTypes { get; set; }

            // interfaceType -> IProcessController subinterface -> process controller type
            public Dictionary<Type, Dictionary<Type, Type>> TypeToProcessControllerTypes { get; set; }


            public static void Initialize(Resources resources)
            {
                resources.ProcessControllerTypes = new List<Type>();
                resources.TypeToProcessControllerTypes = new Dictionary<Type, Dictionary<Type, Type>>();

                foreach (Type interfaceType in DataFacade.GetAllInterfaces())
                {
                    Dictionary<Type, Type> processControllerTypes = new Dictionary<Type, Type>();

                    AddProcessController<PublishProcessControllerTypeAttribute>(resources, interfaceType, typeof(IPublishProcessController), processControllerTypes);
                    AddProcessController<LocalizeProcessControllerTypeAttribute>(resources, interfaceType, typeof(ILocalizeProcessController), processControllerTypes);

                    resources.TypeToProcessControllerTypes.Add(interfaceType, processControllerTypes);
                }
            }



            private static void AddProcessController<T>(Resources resources, Type interfaceType, Type superProcessControllerInterfaceType, Dictionary<Type, Type> processControllerTypes)
                where T : ProcessControllerTypeAttribute
            {
                List<T> publishAttributes = interfaceType.GetCustomAttributesRecursively<T>().ToList();

                if (publishAttributes.Count == 1)
                {
                    Type processControllerType = publishAttributes[0].ProcessControllerType;

                    processControllerTypes.Add(superProcessControllerInterfaceType, processControllerType);

                    if (resources.ProcessControllerTypes.Contains(processControllerType) == false)
                    {
                        resources.ProcessControllerTypes.Add(processControllerType);
                    }
                }
                else if (publishAttributes.Count > 1)
                {
                    throw new InvalidOperationException(string.Format("Only on '{0}' is allowed on the data type '{1}'", typeof(PublishProcessControllerTypeAttribute), interfaceType));
                }
            }
        }
    }
}
