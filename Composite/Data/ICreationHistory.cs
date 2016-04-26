using System;

namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface ICreationHistory: IData
	{
        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.DateTime)]
        [ImmutableFieldId("{59E10FE8-EC55-4b10-B17A-FDE3EB4690F1}")]
        [DefaultFieldNowDateTimeValue()]
        [FunctionBasedNewInstanceDefaultFieldValue("<f:function xmlns:f=\"http://www.composite.net/ns/function/1.0\" name=\"Composite.Utils.Date.Now\" />")]
        [FieldPosition(502)]
        DateTime CreationDate { get; set; }


        /// <exclude />
        [StoreFieldType(PhysicalStoreFieldType.String, 64, IsNullable = true)]
        [ImmutableFieldId("{617E34B5-E035-4107-9109-DB0B33078B2B}")]
        [DefaultFieldStringValue("")]
        [FieldPosition(503)]
        string CreatedBy { get; set; }
	}
}
