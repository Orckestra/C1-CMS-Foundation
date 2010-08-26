using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Collections.Generic;
using Composite.Data.Foundation.CodeGeneration;
using Composite.C1Console.Events;
using Composite.Core.Extensions;
using Composite.Core.Types;


namespace Composite.Data.Foundation
{
    internal static class BuildNewTypeCache
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static BuildNewTypeCache()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static Type GetTypeToBuild(Type dataType)
        {
            Type type;

            using (_resourceLocker.Locker)
            {
                _resourceLocker.Resources.TypeToBuildTypeCache.TryGetValue(dataType, out type);
            }

            if (type == null)
            {
                List<BuildNewHandlerAttribute> attributes = dataType.GetCustomInterfaceAttributes<BuildNewHandlerAttribute>().ToList();

                if (attributes.Count == 0)
                {
                    type = EmptyDataClassGenerator.CreateType(dataType);
                }
                else if (attributes.Count == 1)
                {
                    Verify.IsNotNull(attributes[0].BuildNewHandlerType, "The constructor argument to '{0}' may not be null".FormatWith(typeof(BuildNewHandlerAttribute)));
                    Verify.IsTrue(typeof(IBuildNewHandler).IsAssignableFrom(attributes[0].BuildNewHandlerType), "The type '{0}' does not implement the interface '{1}'".FormatWith(attributes[0].BuildNewHandlerType, typeof(IBuildNewHandler)));

                    var buildNewHandler = (IBuildNewHandler)Activator.CreateInstance(attributes[0].BuildNewHandlerType);

                    type = buildNewHandler.GetTypeToBuild(dataType);
                }
                else
                {
                    throw new InvalidOperationException(string.Format("Only one '{0}' attribute is allowed in the heirachy", typeof(BuildNewHandlerAttribute)));
                }

                using (_resourceLocker.Locker)
                {
                    if (_resourceLocker.Resources.TypeToBuildTypeCache.ContainsKey(dataType) == false)
                    {
                        _resourceLocker.Resources.TypeToBuildTypeCache.Add(dataType, type);
                    }
                }

            }

            return type;
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
            public Dictionary<Type, Type> TypeToBuildTypeCache = new Dictionary<Type, Type>();

            public static void Initialize(Resources resources)
            {
                resources.TypeToBuildTypeCache = new Dictionary<Type, Type>();
            }
        }
    }
}
