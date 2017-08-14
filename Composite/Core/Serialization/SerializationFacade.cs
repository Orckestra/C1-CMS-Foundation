using System;
using System.Collections.Generic;
using Composite.Core.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Core.Serialization.CodeGeneration;
using Composite.Core.Serialization.CodeGeneration.Foundation;
using Composite.Core.Types;


namespace Composite.Core.Serialization
{
    internal static class SerializationFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static SerializationFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }


        public static object Deserialize(Type propertyClassType, string serializedProperties)
        {
            ISerializer serializer = GetSerializer(propertyClassType);

            Dictionary<string, string> objectState =
                StringConversionServices.ParseKeyValueCollection(serializedProperties);

            return serializer.Deserialize(objectState);
        }



        public static T Deserialize<T>(Type propertyClassType, string serializedProperties)
        {
            ISerializer serializer = GetSerializer(propertyClassType);

            Dictionary<string, string> objectState =
                StringConversionServices.ParseKeyValueCollection(serializedProperties);

            return (T)serializer.Deserialize(objectState);
        }



        private static ISerializer GetSerializer(Type propertyClassType)
        {
            var reusourceLocker = _resourceLocker;
            var serializerCache = reusourceLocker.Resources.SerializerCache;

            ISerializer serializer;

            if (serializerCache.TryGetValue(propertyClassType, out serializer))
            {
                return serializer;
            }


            using (reusourceLocker.Locker)
            {
                if (!serializerCache.TryGetValue(propertyClassType, out serializer))
                {
                    serializer = PropertySerializerManager.GetPropertySerializer(propertyClassType);

                    serializerCache.Add(propertyClassType, serializer);
                }
            }

            return serializer;
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
            public CompiledTypeCache<ISerializer> SerializerCache { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.SerializerCache = new CompiledTypeCache<ISerializer>();
            }
        }
    }
}
