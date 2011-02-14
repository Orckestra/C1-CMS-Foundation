using System;


namespace Composite.Data.ProcessControlled
{
    /// <summary>    
    /// Use this interface to get versioning on a given data type.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete("To be removed")]
    public interface IVersionControlled : IProcessControlled
    {
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [ImmutableFieldId("{CB60E5FD-C07E-42ce-925F-C4877CA0F2A6}")]
        [DefaultFieldIntValue(0)]
        [FieldPosition(500)]
        int MajorVersionNumber { get; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [ImmutableFieldId("{88367C1F-2FC2-4b1f-8B28-D52E219BF503}")]
        [DefaultFieldIntValue(0)]
        [FieldPosition(501)]
        int MinorVersionNumber { get; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("{59E10FE8-EC55-4b10-B17A-FDE3EB4690F0}")]
        [DefaultFieldNowDateTimeValue()]
        [FieldPosition(502)]
        DateTime ChangeDate { get; set; } // Setter was added for consistent working of SQL data provider


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 64, IsNullable = true)]
        [ImmutableFieldId("{617E34B5-E035-4107-9109-DB0B33078B2A}")]
        [DefaultFieldStringValue("")]
        [FieldPosition(503)]
        string ChangedBy { get; }
    }
}
