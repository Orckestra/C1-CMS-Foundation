using System;
using System.Collections.Generic;
using Composite.Data.DynamicTypes;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{A68C989B-2ECC-4C9C-8ACD-08B07BF52CF0}")]
    [KeyPropertyName("Id")]
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [CachingAttribute(CachingType.Full)]
    public interface IPageTypeDataFolderTypeLink : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{C94F9A58-2A0E-4A3E-BF22-570B223BD26E}")]
        Guid Id { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{62C9069C-5A42-4F72-AA06-D44A7AA63AA3}")]
        [ForeignKey(typeof(IPageType), "Id", AllowCascadeDeletes = true)]
        Guid PageTypeId { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{76CC0DE4-B093-4EB1-8846-E8C8DE0D1620}")]
        Guid DataTypeId { get; set; }        
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class IPageTypeDataFolderTypeLinkExtensionMethods
    {
        /// <summary>
        /// Removes data items that refer to data types that are not registered, and returns an enumeration of valid links.
        /// </summary>
        /// <param name="pageTypeDataFolderTypeLinks"></param>
        /// <returns></returns>
        public static IEnumerable<IPageTypeDataFolderTypeLink> RemoveDeadLinks(this IEnumerable<IPageTypeDataFolderTypeLink> pageTypeDataFolderTypeLinks)
        {
            foreach (IPageTypeDataFolderTypeLink pageTypeDataFolderTypeLink in pageTypeDataFolderTypeLinks)
            {
                DataTypeDescriptor dataTypeDescriptor;
                if (!DynamicTypeManager.TryGetDataTypeDescriptor(pageTypeDataFolderTypeLink.DataTypeId, out dataTypeDescriptor))
                {
                    DataFacade.Delete<IPageTypeDataFolderTypeLink>(pageTypeDataFolderTypeLink);
                }
                else
                {
                    yield return pageTypeDataFolderTypeLink;
                }
            }
        }
    }
}
