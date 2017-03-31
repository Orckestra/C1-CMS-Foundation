using System;

namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IChangeHistory: IData
	{
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("{59E10FE8-EC55-4b10-B17A-FDE3EB4690F0}")]
        [DefaultFieldNowDateTimeValue]
        [FieldPosition(502)]
        [SearchableField(false, true, true)]
        DateTime ChangeDate { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 64, IsNullable = true)]
        [ImmutableFieldId("{617E34B5-E035-4107-9109-DB0B33078B2A}")]
        [DefaultFieldStringValue("")]
        [FieldPosition(503)]
        [SearchableField(false, true, true)]
        string ChangedBy { get; set; }
	}
}
