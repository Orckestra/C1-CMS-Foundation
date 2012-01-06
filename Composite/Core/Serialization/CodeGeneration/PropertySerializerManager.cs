using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;
using Composite.Core.Serialization.CodeGeneration.Foundation;
using Composite.Core.Types;


namespace Composite.Core.Serialization.CodeGeneration
{
    internal static class PropertySerializerManager
    {
        private static readonly ResourceLocker<Resources> ResourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize, false);


        static PropertySerializerManager()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }

        /// <summary>
        /// Returns a property serializer for the given property type.
        /// If no serializer exists, one will be runtime code generated.
        /// </summary>
        /// <param name="propertyClassType"></param>
        /// <returns></returns>
        public static ISerializer GetPropertySerializer(Type propertyClassType)
        {
            ISerializer serializer;

            if (!ResourceLocker.Resources.SerializersTypesCache.TryGetValue(propertyClassType, out serializer))
            {
                using (ResourceLocker.Locker)
                {
                    if (!ResourceLocker.Resources.SerializersTypesCache.TryGetValue(propertyClassType, out serializer))
                    {
                        Type propertySerializerType = GetPropertySerializerType(propertyClassType);

                        serializer = (ISerializer)Activator.CreateInstance(propertySerializerType);

                        ResourceLocker.Resources.SerializersTypesCache.Add(propertySerializerType, serializer);
                    }
                }
            }

            return serializer;
        }



        private static Type GetPropertySerializerType(Type propertyClassType)
        {
            string propertySerializerTypeName = PropertySerializerTypeCodeGenerator.CreateSerializerClassFullName(propertyClassType);

            Type propertySerializerType = TypeManager.TryGetType(propertySerializerTypeName);

            if (propertySerializerType == null)
            {
                propertySerializerType = CodeGeneratePropertySerializer(propertyClassType);
            }

            return propertySerializerType;
        }




        private static Type CodeGeneratePropertySerializer(Type propertyClassType)
        {
            CodeGenerationBuilder codeGenerationBuilder = new CodeGenerationBuilder("PropertySerializer: " + propertyClassType.FullName);

            PropertySerializerTypeCodeGenerator.AddPropertySerializerTypeCode(codeGenerationBuilder, propertyClassType);

            IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);

            return types.Single();
        }



        private static void Flush()
        {
            ResourceLocker.ResetInitialization();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }



        private sealed class Resources
        {
            public Dictionary<Type, ISerializer> SerializersTypesCache;

            public static void Initialize(Resources resources)
            {
                resources.SerializersTypesCache = new Dictionary<Type, ISerializer>();
            }
        }
    }
}
