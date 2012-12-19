using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Data.Foundation
{
    internal static class ProcessControllerRegistry
    {
        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);


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
                    return _resourceLocker.Resources.ProcessControllerTypes.ToList();
                }
            }
        }


        public static IEnumerable<Type> DataTypesWithProcessControllers
        {
            get
            {
                using (_resourceLocker.Locker)
                {
                    return _resourceLocker.Resources.TypeToProcessControllerTypes.GetKeys().ToList();
                }
            }
        }



        public static Dictionary<Type, Type> GetProcessControllerTypes(Type interfaceType)
        {
            Verify.ArgumentNotNull(interfaceType, "interfaceType");

            var resourceLocker = _resourceLocker;
            var resources = _resourceLocker.Resources;

            Dictionary<Type, Type> processControllerTypes;

            if (!resources.TypeToProcessControllerTypes.TryGetValue(interfaceType, out processControllerTypes))
            {
                using (resourceLocker.Locker)
                {
                    if (!resources.TypeToProcessControllerTypes.TryGetValue(interfaceType, out processControllerTypes))
                    {
                        processControllerTypes = resources.ProcessInterfaceType(_resourceLocker.Resources, interfaceType);
                    }
                }
            }

            return processControllerTypes;
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

            public List<Type> ProcessedInterfaceTypes { get; set; }

            // interfaceType -> IProcessController subinterface -> process controller type            
            public Hashtable<Type, Dictionary<Type, Type>> TypeToProcessControllerTypes { get; set; }

            private ProcessControllerSettings _settings;

            public static void Initialize(Resources resources)
            {
                var configurationSource = GetConfiguration();
                ProcessControllerSettings settings = configurationSource.GetSection(ProcessControllerSettings.SectionName) as ProcessControllerSettings;
                if (settings == null)
                {
                    throw new ConfigurationErrorsException(string.Format("Failed to load the configuration section '{0}' from the configuration", ProcessControllerSettings.SectionName));
                }

                resources._settings = settings;
                resources.ProcessControllerTypes = new List<Type>();
                resources.ProcessedInterfaceTypes = new List<Type>();
                resources.TypeToProcessControllerTypes = new Hashtable<Type, Dictionary<Type, Type>>();

                foreach (Type interfaceType in DataFacade.GetAllInterfaces())
                {
                    resources.ProcessInterfaceType(resources, interfaceType);
                }
            }



            internal Dictionary<Type, Type> ProcessInterfaceType(Resources resources, Type interfaceType)
            {
                Dictionary<Type, Type> processControllerTypes = new Dictionary<Type, Type>();

                foreach (var controllerData in _settings.ProcessControllers)
                {
                    AddProcessController(resources, interfaceType, controllerData.InterfaceType, controllerData.AttributeType, processControllerTypes);
                }

                resources.TypeToProcessControllerTypes.Add(interfaceType, processControllerTypes);

                return processControllerTypes;
            }


            private static IConfigurationSource GetConfiguration()
            {
                IConfigurationSource source = ConfigurationServices.ConfigurationSource;

                if (null == source)
                {
                    throw new ConfigurationErrorsException(string.Format("No configuration source specified"));

                }
                return source;
            }

            private static void AddProcessController(Resources resources, Type interfaceType, Type superProcessControllerInterfaceType, Type attributeType, Dictionary<Type, Type> processControllerTypes)
            {
                var publishAttributes = interfaceType.GetCustomAttributesRecursively(attributeType).Cast<ProcessControllerTypeAttribute>().ToList();

                if (publishAttributes.Count == 0) return;

                Type processControllerType = publishAttributes[0].ProcessControllerType;

                foreach (ProcessControllerTypeAttribute attribute in publishAttributes.Skip(1))
                {
                    Verify.That(attribute.ProcessControllerType != processControllerType,
                        "Only one '{0}' is allowed on the data type '{1}' or all attributes should have same process controller type", 
                        processControllerType, interfaceType);
                }

                processControllerTypes.Add(superProcessControllerInterfaceType, processControllerType);

                if (!resources.ProcessControllerTypes.Contains(processControllerType))
                {
                    resources.ProcessControllerTypes.Add(processControllerType);
                }
            }
        }
    }
}
