using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.ProcessControlled;


namespace Composite.Data.DynamicTypes
{
#warning MRJ: BM: Move this class, possibly rename?
    /// <summary>    
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    public class UpdateDataTypeDescriptor
    {
        public UpdateDataTypeDescriptor(DataTypeDescriptor oldDataTypeDescriptor, DataTypeDescriptor newDataTypeDescriptor, bool originalTypeHasData = true)
        {
            OldDataTypeDescriptor = oldDataTypeDescriptor;
            NewDataTypeDescriptor = newDataTypeDescriptor;
            ProviderName = DataProviderRegistry.DefaultDynamicTypeDataProviderName;
        }



        /// <summary>
        /// </summary>
        public DataTypeDescriptor OldDataTypeDescriptor { get; private set; }



        /// <summary>
        /// </summary>
        public DataTypeDescriptor NewDataTypeDescriptor { get; private set; }



        /// <summary>
        /// </summary>
        public DataTypeChangeDescriptor CreateDataTypeChangeDescriptor()
        {
            return new DataTypeChangeDescriptor(OldDataTypeDescriptor, NewDataTypeDescriptor, OriginalTypeHasData);
        }



        /// <summary>
        /// If this is true, extra validation on what things are changed on 
        /// the data type. Some operation are not allowed if data exists.
        /// </summary>
        public bool OriginalTypeHasData { get; set; }



        /// <summary>
        /// </summary>
        public string ProviderName { get; set; }



        /// <summary>
        /// This is only used when enabling localization for the data type in question
        /// If this empty or contains any cultues, data from existing locale(s) (published/unpublished)
        /// will be copied to these locales.
        /// </summary>
        public IEnumerable<CultureInfo> LocalesToCopyTo { get; set; }



        /// <summary>
        /// This is only used when disabling localization for the data type in question
        /// Data from this locale (published/unpublished) will be copied to the non-localized store(s).
        /// </summary>
        public CultureInfo LocaleToCopyFrom { get; set; }



        /// <summary>
        /// </summary>
        public IEnumerable<DataScopeIdentifier> OldSupportedDataScopeIdentifiers
        {
            get
            {
                yield return DataScopeIdentifier.Administrated;

                if (OldDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled))) yield return DataScopeIdentifier.Public;
            }
        }



        /// <summary>
        /// This is true if publication is added from the data type (IPublishControlled added).
        /// </summary>
        public bool PublicationAdded
        {
            get
            {
                return (OldDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == false) &&
                       (NewDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == true);
            }
        }



        /// <summary>
        /// This is true if publication is removed from the data type (IPublishControlled removed).
        /// </summary>
        public bool PublicationRemoved
        {
            get
            {
                return (OldDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == true) &&
                       (NewDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == false);
            }
        }
    }

}

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



        /// <exclude />
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
