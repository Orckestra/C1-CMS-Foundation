using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using System.Collections.Generic;
using Composite.Data.DynamicTypes;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{37A346A5-8776-4765-9D57-A3F2CD8E459D}")]
    [LabelPropertyName("Name")]
    [KeyPropertyName("Id")]    
    [DataAncestorProvider(typeof(NoAncestorDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [CachingAttribute(CachingType.Full)]
    public interface IPageTypeMetaDataTypeLink : IData
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{B186C166-9EA7-489A-BEFE-E576FE7E3FF9}")]
        Guid Id { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{6F0FD511-FA79-486E-A371-AFC7A3E6C614}")]
        [ForeignKey(typeof(IPageType), "Id", AllowCascadeDeletes = true)]
        Guid PageTypeId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{BCD3927D-D166-431D-936F-1B6843B91E82}")]
        Guid DataTypeId { get; set; }


        /// <summary>
        /// This should match the name of the ICompositionDescription
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        [ImmutableFieldId("{8BD9BEDF-9677-4415-A3DD-E7BBD0A14286}")]
        [NotNullValidator()]
        string Name { get; set; }       
    }







    internal static class IPageTypeMetaDataTypeLinkExtensionMethods
    {
        public static IEnumerable<IPageTypeMetaDataTypeLink> RemoveDeadLinks(this IEnumerable<IPageTypeMetaDataTypeLink> pageTypeMetaDataTypeLinks)
        {
            foreach (IPageTypeMetaDataTypeLink pageTypeMetaDataTypeLink in pageTypeMetaDataTypeLinks)
            {
                DataTypeDescriptor dataTypeDescriptor;
                if (DynamicTypeManager.TryGetDataTypeDescriptor(pageTypeMetaDataTypeLink.DataTypeId, out dataTypeDescriptor) == false)
                {
                    DataFacade.Delete<IPageTypeMetaDataTypeLink>(pageTypeMetaDataTypeLink);
                }
                else
                {
                    yield return pageTypeMetaDataTypeLink;
                }
            }
        }
    }
}
