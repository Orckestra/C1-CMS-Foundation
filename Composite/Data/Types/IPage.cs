using System;
using Composite.Data.Hierarchy;
using Composite.Data.Hierarchy.DataAncestorProviders;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types.Foundation;
using Composite.Data.Visualization;
using Microsoft.Practices.EnterpriseLibrary.Validation.Validators;
using Composite.Renderings.Data;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Title("C1 Page")]
    [AutoUpdateble]
    [TypeVersion(3)]
    [ImmutableTypeId("{C046F704-D3E4-4b3d-8CB9-77564FB0B9E7}")]
    [KeyPropertyName("Id")]
    [DataVisualizer(typeof(Composite.Data.Visualization.PageVisualizer))]
    [DataAncestorProvider(typeof(PageDataAncestorProvider))]
    [DataScope(DataScopeIdentifier.PublicName)]
    [DataScope(DataScopeIdentifier.AdministratedName)]
    [LabelPropertyName("Title")]
    [RelevantToUserType(UserType.Developer)]
    [CachingAttribute(CachingType.Full)]
    [PublishControlledAuxiliary(typeof(PagePublishControlledAuxiliary))]
    [PublishProcessControllerTypeAttribute(typeof(GenericPublishProcessController))]
    [KeyTemplatedXhtmlRenderer(XhtmlRenderingType.Embedable, "<a href='~/Renderers/Page.aspx?pageId={id}'>{label}</a>")]
    public interface IPage : IData, IChangeHistory, IPublishControlled, ILocalizedControlled
    {
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{FA2691BB-191E-4520-BF60-F3B7D1762CE0}")]
        Guid Id { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{46D0EBCD-B604-4cc2-B0B0-C0F589172680}")]
        [ForeignKey(typeof(IPageTemplate), "Id")]
        Guid TemplateId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{69303D16-F681-4C2F-BA73-AF8B2B94AAB2}")]
        [ForeignKey(typeof(IPageType), "Id", NullReferenceValue = "{00000000-0000-0000-0000-000000000000}", NullReferenceValueType = typeof(Guid))]
        [DefaultFieldGuidValue("{00000000-0000-0000-0000-000000000000}")]
        Guid PageTypeId { get; set; }


        [StoreFieldType(PhysicalStoreFieldType.String, 255)]
        [ImmutableFieldId("{8A06D28E-DAD9-438d-9570-0C0120ADD560}")]
        [NotNullValidator()]
        string Title { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 64, IsNullable = true)]
        [ImmutableFieldId("{3E398FA5-7961-4a75-A6CE-C147B7F4B90A}")]
        string MenuTitle { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 192)]
        [ImmutableFieldId("{C9A81ADE-DAD5-4740-A891-DF1CE2FAB498}")]
        [NotNullValidator()]
        [Composite.Validation.Validators.RegexValidator(@"^[-\p{Ll}\p{Lu}\p{Lt}\p{Lo}\p{Nd}\p{Pc}\p{Lm}]*$")]
        string UrlTitle { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 192, IsNullable = true)]
        [ImmutableFieldId("{22787AD0-349A-432f-89C7-3D532B613BB7}")]
        string FriendlyUrl { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.String, 1024, IsNullable = true)]
        [ImmutableFieldId("{3EECB770-1D8F-45e0-9B4D-2CA67A278FA3}")]
        string Abstract { get; set; }
    }
}
