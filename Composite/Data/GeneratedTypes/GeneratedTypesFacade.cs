using System;
using System.Diagnostics;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Core.Types;


namespace Composite.Data.GeneratedTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class GenerateNewTypeEventArgs : EventArgs
    {
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class UpdateTypeEventArgs : EventArgs
    {
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class DeleteTypeEventArgs : EventArgs
    {
    }





    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class GeneratedTypesFacade
    {
        public delegate void GenerateNewTypeDelegate(GenerateNewTypeEventArgs args);
        public delegate void UpdateTypeDelegate(UpdateTypeEventArgs args);
        public delegate void DeleteTypeDelegate(DeleteTypeEventArgs args);


        private static event GenerateNewTypeDelegate _generateNewTypeDelegate;
        private static event UpdateTypeDelegate _updateTypeDelegate;
        private static event DeleteTypeDelegate _deleteTypeDelegate;


        private static IGeneratedTypesFacade _generatedTypesFacade = new GeneratedTypesFacadeImpl();


        internal static IGeneratedTypesFacade Implementation { get { return _generatedTypesFacade; } set { _generatedTypesFacade = value; } }
        


        // Overload
        public static void GenerateNewType(DataTypeDescriptor dataTypeDescriptor)
        {
            GenerateNewType(DataProviderRegistry.DefaultDynamicTypeDataProviderName, dataTypeDescriptor, true);
        }



        // Overload
        public static void GenerateNewType(DataTypeDescriptor dataTypeDescriptor, bool makeAFlush)
        {
            GenerateNewType(DataProviderRegistry.DefaultDynamicTypeDataProviderName, dataTypeDescriptor, makeAFlush);
        }



        public static void GenerateNewType(string providerName, DataTypeDescriptor dataTypeDescriptor, bool makeAFlush)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                _generatedTypesFacade.GenerateNewType(providerName, dataTypeDescriptor, makeAFlush);

                if (_generateNewTypeDelegate != null)
                {
                    GenerateNewTypeDelegate generateNewTypeDelegate = _generateNewTypeDelegate;
                    generateNewTypeDelegate(new GenerateNewTypeEventArgs());
                }
            }
        }

        public static bool CanDeleteType(DataTypeDescriptor dataTypeDescriptor, out string errorMessage)
        {
            return _generatedTypesFacade.CanDeleteType(dataTypeDescriptor, out errorMessage);
        }


        public static void DeleteType(DataTypeDescriptor dataTypeDescriptor)
        {
            DeleteType(DataProviderRegistry.DefaultDynamicTypeDataProviderName, dataTypeDescriptor, true);
        }



        internal static void DeleteType(DataTypeDescriptor dataTypeDescriptor, bool makeAFlush)
        {
            DeleteType(DataProviderRegistry.DefaultDynamicTypeDataProviderName, dataTypeDescriptor, makeAFlush);
        }



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



        public static void UpdateType(DataTypeDescriptor oldDataTypeDescriptor, DataTypeDescriptor newDataTypeDescriptor, bool originalTypeHasData)
        {
            UpdateType(DataProviderRegistry.DefaultDynamicTypeDataProviderName, oldDataTypeDescriptor, newDataTypeDescriptor, originalTypeHasData);
        }



        public static void UpdateType(DataTypeDescriptor oldDataTypeDescriptor, DataTypeDescriptor newDataTypeDescriptor)
        {
            UpdateType(DataProviderRegistry.DefaultDynamicTypeDataProviderName, oldDataTypeDescriptor, newDataTypeDescriptor, true);
        }



        public static void UpdateType(string providerName, DataTypeDescriptor oldDataTypeDescriptor, DataTypeDescriptor newDataTypeDescriptor, bool originalTypeHasData)
        {
            using (GlobalInitializerFacade.CoreLockScope)
            {
                _generatedTypesFacade.UpdateType(providerName, oldDataTypeDescriptor, newDataTypeDescriptor, originalTypeHasData);

                if (_updateTypeDelegate != null)
                {
                    UpdateTypeDelegate updateDelegate = _updateTypeDelegate;
                    updateDelegate(new UpdateTypeEventArgs());
                }
            }
        }



        public static void SubscribeToGenerateNewTypeEvent(GenerateNewTypeDelegate eventDelegate)
        {
            _generateNewTypeDelegate += eventDelegate;
        }



        public static void SubscribeToUpdateTypeEvent(UpdateTypeDelegate eventDelegate)
        {
            _updateTypeDelegate += eventDelegate;
        }



        public static void SubscribeToDeleteTypeEvent(DeleteTypeDelegate eventDelegate)
        {
            _deleteTypeDelegate += eventDelegate;
        }



        public static void UnsubscribeToGenerateNewTypeEvent(GenerateNewTypeDelegate eventDelegate)
        {
            _generateNewTypeDelegate -= eventDelegate;
        }



        public static void UnsubscribeToUpdateTypeEvent(UpdateTypeDelegate eventDelegate)
        {
            _updateTypeDelegate -= eventDelegate;
        }



        public static void UnsubscribeToDeleteTypeEvent(DeleteTypeDelegate eventDelegate)
        {
            _deleteTypeDelegate -= eventDelegate;
        }



        internal static void GenerateTypes()
        {
            if (RuntimeInformation.IsDebugBuild == true)
            {
                GlobalInitializerFacade.ValidateIsOnlyCalledFromGlobalInitializerFacade(new StackTrace());
            }


            using (GlobalInitializerFacade.CoreLockScope)
            {
                _generatedTypesFacade.GenerateTypes();
            }
        }
    }
}
