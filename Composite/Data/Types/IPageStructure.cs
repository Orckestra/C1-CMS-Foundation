using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AutoUpdateble]
    [ImmutableTypeId("{797A1A98-6E5C-4a1e-B346-AE547A1F4E90}")]
    [KeyPropertyName("Id")]
    [DataScope(DataScopeIdentifier.PublicName)]
    [CachingAttribute(CachingType.Full)]    
	public interface IPageStructure : IData
	{
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{CBB49E56-A05C-4a33-9F8B-9253C2EDB9C2}")]
        Guid Id { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{57AF0FDA-BA4F-4281-ACAF-A56C28FEF2E6}")]
        Guid ParentId { get; set; }

        [StoreFieldType(PhysicalStoreFieldType.Integer)]
        [ImmutableFieldId("{87BD6871-CF25-48f2-9ED5-BF41B272551F}")]
        int LocalOrdering { get; set; }
	}
}
