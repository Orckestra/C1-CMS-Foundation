using Composite.Data.Types.Foundation;
using Composite.Core.Serialization;
using Composite.Data.DynamicTypes;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [BuildNewHandler(typeof(IFileBuildNewHandler))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [SerializerHandler(typeof(ExceptingSerializerHandler))]
    public interface IFile : IData
    {
        /// <exclude />
        [ImmutableFieldId("{B9B50947-EE78-4744-9128-0832A66243D5}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 512)]
        string FolderPath { get; set; }


        /// <exclude />
        [ImmutableFieldId("{4FD98564-6077-4c6d-86E1-9C7F44B65E50}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [SearchableField(true, false, false)]
        string FileName { get; set; }
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class IFileUtils
    {
        /// <exclude />
        public static bool ValidateValueLengths(this IFile file)
        {
            if ((file.FolderPath != null) && (file.FolderPath.Length > DataTypeDescriptor.Fields["FolderPath"].StoreType.MaximumLength)) return false;
            if ((file.FileName != null) && (file.FileName.Length > DataTypeDescriptor.Fields["FileName"].StoreType.MaximumLength)) return false;

            return true;
        }



        private static DataTypeDescriptor _dataTypeDescriptor = null;
        private static DataTypeDescriptor DataTypeDescriptor
        {
            get
            {
                if (_dataTypeDescriptor == null)
                {
                    _dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeof(IFile));
                }

                return _dataTypeDescriptor;
            }
        }
    }
}