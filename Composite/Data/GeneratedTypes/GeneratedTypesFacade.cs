using System;
using System.Collections.Generic;
using System.ComponentModel;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;


namespace Composite.Data.GeneratedTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public class GenerateNewTypeEventArgs : EventArgs
    {
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public class UpdateTypeEventArgs : EventArgs
    {
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public class DeleteTypeEventArgs : EventArgs
    {
    }





    /// <summary>    
    /// This class is used to create/update/delete generated types. That is, types
    /// that is not defined in code, but designed through the UI and is dynamicly
    /// compiled. 
    /// When a data type is created/updated/deleted the interface is (re)code-generated/deleted 
    /// and the store is created/updated/deleted through <see cref="Composite.Data.DynamicTypes.DynamicTypeManager"/>
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)] 
    public static class GeneratedTypesFacade
    {
        /// <exclude />
        public delegate void GenerateNewTypeDelegate(GenerateNewTypeEventArgs args);

        /// <exclude />
        public delegate void UpdateTypeDelegate(UpdateTypeEventArgs args);

        /// <exclude />
        public delegate void DeleteTypeDelegate(DeleteTypeEventArgs args);


        private static event GenerateNewTypeDelegate _generateNewTypeDelegate;
        private static event UpdateTypeDelegate _updateTypeDelegate;
        private static event DeleteTypeDelegate _deleteTypeDelegate;


        private static IGeneratedTypesFacade _generatedTypesFacade = new GeneratedTypesFacadeImpl();


        internal static IGeneratedTypesFacade Implementation { get { return _generatedTypesFacade; } set { _generatedTypesFacade = value; } }
        


        // Overload
        /// <exclude />
        public static void GenerateNewType(DataTypeDescriptor dataTypeDescriptor)
        {
            GenerateNewType(DataProviderRegistry.DefaultDynamicTypeDataProviderName, dataTypeDescriptor, true);
        }



        // Overload
        /// <exclude />
        public static void GenerateNewType(DataTypeDescriptor dataTypeDescriptor, bool makeAFlush)
        {
            GenerateNewType(DataProviderRegistry.DefaultDynamicTypeDataProviderName, dataTypeDescriptor, makeAFlush);
        }


        // Overload
        /// <exclude />
        public static void GenerateNewTypes(IReadOnlyCollection<DataTypeDescriptor> dataTypeDescriptor, bool makeAFlush)
        {
            GenerateNewTypes(DataProviderRegistry.DefaultDynamicTypeDataProviderName, dataTypeDescriptor, makeAFlush);
        }


        /// <exclude />
        public static void GenerateNewType(string providerName, DataTypeDescriptor dataTypeDescriptor, bool makeAFlush)
        {
            GenerateNewTypes(providerName, new[] {dataTypeDescriptor}, makeAFlush);
        }


        /// <exclude />
        public static void GenerateNewTypes(string providerName, IReadOnlyCollection<DataTypeDescriptor> dataTypeDescriptors, bool makeAFlush)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                _generatedTypesFacade.GenerateNewTypes(providerName, dataTypeDescriptors, makeAFlush);

                if (_generateNewTypeDelegate != null)
                {
                    GenerateNewTypeDelegate generateNewTypeDelegate = _generateNewTypeDelegate;
                    generateNewTypeDelegate(new GenerateNewTypeEventArgs());
                }
            }
        }


        /// <exclude />
        public static bool CanDeleteType(DataTypeDescriptor dataTypeDescriptor, out string errorMessage)
        {
            return _generatedTypesFacade.CanDeleteType(dataTypeDescriptor, out errorMessage);
        }


        /// <exclude />
        public static void DeleteType(DataTypeDescriptor dataTypeDescriptor)
        {
            DeleteType(DataProviderRegistry.DefaultDynamicTypeDataProviderName, dataTypeDescriptor, true);
        }



        internal static void DeleteType(DataTypeDescriptor dataTypeDescriptor, bool makeAFlush)
        {
            DeleteType(DataProviderRegistry.DefaultDynamicTypeDataProviderName, dataTypeDescriptor, makeAFlush);
        }



        /// <exclude />
        public static void DeleteType(string providerName, DataTypeDescriptor dataTypeDescriptor)
        {
            DeleteType(providerName, dataTypeDescriptor, true);
        }



        internal static void DeleteType(string providerName, DataTypeDescriptor dataTypeDescriptor, bool makeAFlush)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                PageFolderFacade.RemoveAllFolderDefinitions(dataTypeDescriptor.DataTypeId, false);
                PageMetaDataFacade.RemoveAllDefinitions(dataTypeDescriptor.DataTypeId, false);

                _generatedTypesFacade.DeleteType(providerName, dataTypeDescriptor, makeAFlush);

                if (_deleteTypeDelegate != null)
                {
                    DeleteTypeDelegate deleteDelegate = _deleteTypeDelegate;
                    deleteDelegate(new DeleteTypeEventArgs());
                }
            }
        }



        ///// <exclude />
        //public static void UpdateType(DataTypeDescriptor oldDataTypeDescriptor, DataTypeDescriptor newDataTypeDescriptor, bool originalTypeHasData)
        //{
        //    UpdateType(DataProviderRegistry.DefaultDynamicTypeDataProviderName, oldDataTypeDescriptor, newDataTypeDescriptor, originalTypeHasData);
        //}



        ///// <exclude />
        //public static void UpdateType(DataTypeDescriptor oldDataTypeDescriptor, DataTypeDescriptor newDataTypeDescriptor)
        //{
        //    UpdateType(DataProviderRegistry.DefaultDynamicTypeDataProviderName, oldDataTypeDescriptor, newDataTypeDescriptor, true);
        //}



        /// <exclude />
        public static void UpdateType(UpdateDataTypeDescriptor updateDataTypeDescriptor)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {                
                _generatedTypesFacade.UpdateType(updateDataTypeDescriptor);

                if (_updateTypeDelegate != null)
                {
                    UpdateTypeDelegate updateDelegate = _updateTypeDelegate;
                    updateDelegate(new UpdateTypeEventArgs());
                }
            }
        }



        /// <exclude />
        public static void SubscribeToGenerateNewTypeEvent(GenerateNewTypeDelegate eventDelegate)
        {
            _generateNewTypeDelegate += eventDelegate;
        }



        /// <exclude />
        public static void SubscribeToUpdateTypeEvent(UpdateTypeDelegate eventDelegate)
        {
            _updateTypeDelegate += eventDelegate;
        }



        /// <exclude />
        public static void SubscribeToDeleteTypeEvent(DeleteTypeDelegate eventDelegate)
        {
            _deleteTypeDelegate += eventDelegate;
        }



        /// <exclude />
        public static void UnsubscribeToGenerateNewTypeEvent(GenerateNewTypeDelegate eventDelegate)
        {
            _generateNewTypeDelegate -= eventDelegate;
        }



        /// <exclude />
        public static void UnsubscribeToUpdateTypeEvent(UpdateTypeDelegate eventDelegate)
        {
            _updateTypeDelegate -= eventDelegate;
        }



        /// <exclude />
        public static void UnsubscribeToDeleteTypeEvent(DeleteTypeDelegate eventDelegate)
        {
            _deleteTypeDelegate -= eventDelegate;
        }        
    }
}
