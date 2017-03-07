namespace Composite.Data.ProcessControlled
{
    /// <summary>
    /// Add this interface to your data type to support publication workflow.
    /// </summary>
    [DataScope(DataScopeIdentifier.PublicName)]
    [DataScope(DataScopeIdentifier.AdministratedName)]    
	public interface IPublishControlled : IProcessControlled
	{
        /// <summary>
        /// The workflow status of data.
        /// </summary>
        [StoreFieldType(PhysicalStoreFieldType.String, 64, IsNullable = false)]
        [ImmutableFieldId("{FAB1CF0C-66B0-11DC-A47E-CF6356D89593}")]
        [DefaultFieldStringValue("")]
        [FieldPosition(50)]
        [SearchableField(false, true, true)]
        string PublicationStatus { get; set; }
	}
}
