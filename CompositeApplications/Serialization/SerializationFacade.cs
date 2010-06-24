using System;
using System.Collections.Generic;
using System.Text;
using Composite.Collections.Generic;
using Composite.EventSystem;
using Composite.Extensions;
using Composite.Serialization.CodeGeneration;
using Composite.Serialization.CodeGeneration.Foundation;
using Composite.Types;
using Composite.Logging;


namespace Composite.Serialization
{
    public static class SerializationFacade
    {
        private static ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);



        static SerializationFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }


        public static string Serialize(object propertyClass)
        {
            ISerializer serializer = GetSerializer(propertyClass.GetType());

            StringBuilder sb = new StringBuilder();

            serializer.Serialize(propertyClass, sb);

            return sb.ToString();
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
                    using (DebugLoggingScope.CompletionTime(typeof(SerializationFacade), "compiling serializer for type '{0}'".FormatWith(propertyClassType.FullName)))
                    {
                        serializer = SerializerGenerator.CreateSerializer(propertyClassType);
                    }

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
            public DynamicBuildManagetTypeCache<ISerializer> SerializerCache { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.SerializerCache = new DynamicBuildManagetTypeCache<ISerializer>();
            }
        }
    }
}
