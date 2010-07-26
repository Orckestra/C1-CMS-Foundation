namespace Composite.Data.ProcessControlled
{
    [DataScope(DataScopeIdentifier.PublicName)]
    [DataScope(DataScopeIdentifier.AdministratedName)]    
	public interface IPublishControlled : IProcessControlled
	{
        [StoreFieldType(PhysicalStoreFieldType.String, 64, IsNullable = false)]
        [ImmutableFieldId("{FAB1CF0C-66B0-11DC-A47E-CF6356D89593}")]
        [DefaultFieldStringValue("")]
        [BeforeSet(typeof(PublishControlledSetPropertyHandler))]
        [FieldPosition(50)]
        string PublicationStatus { get; set; }
	}
}
