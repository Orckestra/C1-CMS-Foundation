using System;
using System.Linq;
using System.Collections.Generic;
using Composite.C1Console.Events;
using Composite.Core.Collections.Generic;
using Composite.Data.DynamicTypes;
using Composite.Core.Types;
using Composite.Data.Foundation.CodeGeneration;


namespace Composite.Data.Foundation
{
    /// <summary>
    /// This class caches and if needed creates data empty classes runtime.
    /// </summary>
    internal static class EmptyDataClassTypeManager
    {
        private static readonly object _lock = new object();
        private static readonly ResourceLocker<Resources> ResourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize);

        static EmptyDataClassTypeManager()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        /// <summary>
        /// This method will return the type of the empty data class type.
        /// If the type does not exist, one will be runtime code generated
        /// using the type to get a data type descriptor.
        /// </summary>
        /// <param name="interfaceType">The data interface type to get the empty class type for.</param>
        /// <param name="forceReCompilation">
        /// If this is true a new empty class will be 
        /// compiled at runtime regardless if it exists or not.
        /// Use with caution!
        /// </param>
        /// <returns>The empty class type for the given data interface type.</returns>
        public static Type GetEmptyDataClassType(Type interfaceType, bool forceReCompilation = false)
        {
            DataTypeDescriptor dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(interfaceType.GetImmutableTypeId(), true);

            return GetEmptyDataClassType(dataTypeDescriptor, forceReCompilation);
        }



        /// <summary>
        /// This method will return the type of the empty data class type.
        /// If the type does not exist, one will be runtime code generated
        /// using the <paramref name="dataTypeDescriptor"/>. 
        /// </summary>
        /// <param name="dataTypeDescriptor">
        /// The data type descriptor for the data type to get 
        /// the empty class type for.
        /// </param>
        /// <param name="forceReCompilation">
        /// If this is true a new empty class will be 
        /// compiled at runtime regardless if it exists or not.
        /// Use with caution!
        /// </param>
        /// <returns>The empty class type for the given data interface type.</returns>
        public static Type GetEmptyDataClassType(DataTypeDescriptor dataTypeDescriptor, bool forceReCompilation = false)
        {
#warning MRJ: BM: Why even have this cache?? If changed, change the doc for this class
            /* Type emptyClassType;
            using (ResourceLocker.Locker)
            {

                ResourceLocker.Resources.DataEmptyClassTypes.TryGetValue(dataTypeDescriptor.DataTypeId, out emptyClassType);
            }
            */



            if (forceReCompilation)
            {
                return CreateEmptyDataClassType(dataTypeDescriptor);
            }

#warning MRJ: BM: Messe code here. Refac some how. But needs to check IsRecopileNeeded and use locking.

            Type interfaceType = TypeManager.TryGetType(dataTypeDescriptor.GetFullInterfaceName());

            string emptyClassFullName = EmptyDataClassCodeGenerator.GetEmptyClassTypeFullName(dataTypeDescriptor);
            Type emptyClassType = TypeManager.TryGetType(emptyClassFullName);

            bool isRecompileNeeded = true;
            if (interfaceType != null)
            {
                isRecompileNeeded = CodeGenerationManager.IsRecompileNeeded(interfaceType, new[] { emptyClassType });
            }

            if (isRecompileNeeded)
            {
                lock (_lock)
                {
                    interfaceType = TypeManager.TryGetType(dataTypeDescriptor.GetFullInterfaceName());
                    emptyClassType = TypeManager.TryGetType(emptyClassFullName);
                    if (interfaceType != null)
                    {
                        isRecompileNeeded = CodeGenerationManager.IsRecompileNeeded(interfaceType, new[] { emptyClassType });
                    }

                    if (isRecompileNeeded)
                    {
                        emptyClassType = CreateEmptyDataClassType(dataTypeDescriptor);
                    }
                }
            }

            return emptyClassType;
        }



        private static Type CreateEmptyDataClassType(DataTypeDescriptor dataTypeDescriptor)
        {
            if (string.IsNullOrEmpty(dataTypeDescriptor.BuildNewHandlerTypeName))
            {
                CodeGenerationBuilder codeGenerationBuilder = new CodeGenerationBuilder("EmptyDataClass: " + dataTypeDescriptor.Name);
                EmptyDataClassCodeGenerator.AddAssemblyReferences(codeGenerationBuilder, dataTypeDescriptor);
                EmptyDataClassCodeGenerator.AddEmptyDataClassTypeCode(codeGenerationBuilder, dataTypeDescriptor);

                IEnumerable<Type> types = CodeGenerationManager.CompileRuntimeTempTypes(codeGenerationBuilder);

                return types.Single();
            }
            else
            {
                Type buildNewHandlerType = TypeManager.GetType(dataTypeDescriptor.BuildNewHandlerTypeName);
                IBuildNewHandler buildNewHandler = (IBuildNewHandler)Activator.CreateInstance(buildNewHandlerType);

                //INFO: Due to the way IBuildNewHandler is defined, we have to get the interface type here /MRJ
                Type interfaceType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

                return buildNewHandler.GetTypeToBuild(interfaceType);
            }
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
            internal Dictionary<Guid, Type> DataEmptyClassTypes { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.DataEmptyClassTypes = new Dictionary<Guid, Type>();
            }
        }
    }
}
