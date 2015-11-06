namespace Composite.Data.Types
{
    /// <summary>
    /// Defines the interface which enables sorting of data on the same level.
    /// </summary>
    public interface IGenericSortable : IData
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [ImmutableFieldId("{87BD6871-CF25-48f2-9ED5-BF41B272551F}")]
        [DefaultFieldIntValue(0)]
        [TreeOrdering(999)]
        int LocalOrdering { get; set; }
    }
}
