using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Events;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;
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
            VerifyAssemblyLocation(interfaceType);

            var dataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(interfaceType, true);

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
            if (!string.IsNullOrEmpty(dataTypeDescriptor.BuildNewHandlerTypeName))
            {
                return GetEmptyClassFromBuildNewHandler(dataTypeDescriptor);
            }


            if (forceReCompilation)
            {
                return CreateEmptyDataClassType(dataTypeDescriptor);
            }

            Type interfaceType = TypeManager.TryGetType(dataTypeDescriptor.TypeManagerTypeName);

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



        private static Type GetEmptyClassFromBuildNewHandler(DataTypeDescriptor dataTypeDescriptor)
        {
            Type buildNewHandlerType = TypeManager.GetType(dataTypeDescriptor.BuildNewHandlerTypeName);
            IBuildNewHandler buildNewHandler = (IBuildNewHandler)Activator.CreateInstance(buildNewHandlerType);

            Type dataType = DataTypeTypesManager.GetDataType(dataTypeDescriptor);

            VerifyAssemblyLocation(dataType);

            return buildNewHandler.GetTypeToBuild(dataType);
        }


        private static void VerifyAssemblyLocation(Type interfaceType)
        {
            if (!DataTypeTypesManager.IsAllowedDataTypeAssembly(interfaceType))
            {
                string message = $"The data interface '{interfaceType}' is not located in an assembly in the website Bin folder. Please move it to that location";
                Log.LogError(nameof(EmptyDataClassTypeManager), message);
                throw new InvalidOperationException(message);
            }
        }


        internal static Type CreateEmptyDataClassType(DataTypeDescriptor dataTypeDescriptor, Type baseClassType = null, CodeAttributeDeclaration codeAttributeDeclaration = null)
        {
            var codeGenerationBuilder = new CodeGenerationBuilder("EmptyDataClass: " + dataTypeDescriptor.Name);
            EmptyDataClassCodeGenerator.AddAssemblyReferences(codeGenerationBuilder, dataTypeDescriptor);
            EmptyDataClassCodeGenerator.AddEmptyDataClassTypeCode(codeGenerationBuilder, dataTypeDescriptor, baseClassType, codeAttributeDeclaration);

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
            internal Dictionary<Guid, Type> DataEmptyClassTypes { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.DataEmptyClassTypes = new Dictionary<Guid, Type>();
            }
        }
    }
}
