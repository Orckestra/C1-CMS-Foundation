using System;
using Composite.Data.Hierarchy;
using Composite.Core.WebClient.Renderings.Data;


namespace Composite.Data.Types
{
    /// <summary>    
    /// This data interface represents a media file in C1 CMS. This can be used to query media through a <see cref="Composite.Data.DataConnection"/>. 
    /// </summary>
    [Title("C1 Media File")]
    [KeyPropertyName("KeyPath")]
    [DataAncestorProviderAttribute(typeof(MediaFileDataAncesorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [ImmutableTypeId("{A8716C78-1499-4155-875B-2545006385B2}")]
    [LabelPropertyName("CompositePath")]
    [RelevantToUserType(UserType.Developer)]
    [KeyTemplatedXhtmlRenderer(XhtmlRenderingType.Embedable, "<a href='~/media({field:StoreId}:{field:Id})'>{label}</a>")]
    public interface IMediaFile : IFile
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{a85bb1d0-1413-44e2-9b78-92ecd3fd1f77}")]
        Guid Id { get; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 2048)]
        [ImmutableFieldId("{46024846-b43c-4675-9a6e-ed16ffd29420}")]
        string KeyPath { get; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 2048)]
        [ImmutableFieldId("{9DAC181A-DA51-455e-BE73-55719FA2CC9C}")]
        string CompositePath { get; set; }


        /// <exclude />
        [ImmutableFieldId("{D595E909-7E32-4dd0-90AE-63C2DAE0E7BF}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 32)]
        string StoreId { get; set; }


        /// <exclude />
        [ImmutableFieldId("{22FB743F-1731-426e-BB22-78A08F956749}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [SearchableField(true, false, false)]
        string Title { get; set; }


        /// <exclude />
        [ImmutableFieldId("{FA75B9B1-82D3-47ce-80F8-BAEF4CDE43FD}")]
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [SearchableField(true, true, false)]
        string Description { get; set; }

        /// <exclude />
        [ImmutableFieldId("{016372B5-9692-4C2D-B64D-8FC6594BBCFF}")]
        [StoreFieldType(PhysicalStoreFieldType.LargeString)]
        [SearchableField(true, true, true)]
        string Tags { get; set; }


        /// <exclude />
        [ImmutableFieldId("{D4B7D47E-49CF-43c9-AC36-4134B136860A}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 128)]
        string Culture { get; set; }


        /// <exclude />
        [ImmutableFieldId("{EBF481B7-7A5D-4678-93E9-1FF189311404}")]
        [StoreFieldType(PhysicalStoreFieldType.String, 256)]
        [SearchableField(false, true, true)]
        string MimeType { get; }

        /// <exclude />
        [ImmutableFieldId("{BCD0C1A2-9769-4209-8D43-DB7DDBABBB8B}")]
        [StoreFieldType(PhysicalStoreFieldType.Integer, IsNullable=true)]
        int? Length { get; }


        /// <exclude />
        [ImmutableFieldId("{6BBE4326-998A-4111-BA6F-CC05A518CF6A}")]
        [StoreFieldType(PhysicalStoreFieldType.DateTime, IsNullable = true)]
        [SearchableField(false, true, true)]
        DateTime? CreationTime { get; }


        /// <exclude />
        [ImmutableFieldId("{564952B9-C95F-4408-BD00-206DF0CD45C6}")]
        [StoreFieldType(PhysicalStoreFieldType.DateTime, IsNullable = true)]
        DateTime? LastWriteTime { get; }


        /// <exclude />
        [ImmutableFieldId("{72C36EED-15DC-44a8-98D5-EE828D3B6AB8}")]
        [StoreFieldType(PhysicalStoreFieldType.Boolean)]
        bool IsReadOnly { get; }
    }
}
