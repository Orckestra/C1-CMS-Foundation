using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using Composite.Data.Foundation;
using Composite.Data.ProcessControlled;
using Composite.Core.Linq;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// This is a helper class to use when making changes to a data type descriptor.
    /// It is mainly used by data providers when they have to update the under laying stores.
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    public class UpdateDataTypeDescriptor
    {
        /// <summary>
        /// </summary>
        /// <param name="oldDataTypeDescriptor"></param>
        /// <param name="newDataTypeDescriptor"></param>
        /// <param name="originalTypeHasData"></param>
        public UpdateDataTypeDescriptor(DataTypeDescriptor oldDataTypeDescriptor, DataTypeDescriptor newDataTypeDescriptor, bool originalTypeHasData = true)
        {
            OldDataTypeDescriptor = oldDataTypeDescriptor;
            NewDataTypeDescriptor = newDataTypeDescriptor;

            var interfaceType = oldDataTypeDescriptor.GetInterfaceType();

            ProviderName = interfaceType != null 
                ? DataProviderRegistry.GetWriteableDataProviderNamesByInterfaceType(interfaceType)
                                      .SingleOrException("Failed to get data provider by type '{0}'",
                                                         "Multiple data providers for type '{0}'", interfaceType.FullName)
                : DataProviderRegistry.DefaultDynamicTypeDataProviderName;
        }

        internal UpdateDataTypeDescriptor(DataTypeDescriptor oldDataTypeDescriptor,
            DataTypeDescriptor newDataTypeDescriptor, 
            string providerName)
        {
            OldDataTypeDescriptor = oldDataTypeDescriptor;
            NewDataTypeDescriptor = newDataTypeDescriptor;

            ProviderName = providerName;
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
                       (NewDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)));
            }
        }



        /// <summary>
        /// This is true if publication is removed from the data type (IPublishControlled removed).
        /// </summary>
        public bool PublicationRemoved
        {
            get
            {
                return (OldDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled))) &&
                       (NewDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled)) == false);
            }
        }




        /// <summary>
        /// This is true if the new data type description has publication.
        /// </summary>
        public bool NewHasPublication
        {
            get
            {
                return NewDataTypeDescriptor.SuperInterfaces.Contains(typeof(IPublishControlled));
            }
        }
    }
}
