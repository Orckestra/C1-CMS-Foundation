using System;

namespace Composite.Data.Types.Foundation
{
    [Obsolete("See IPageMetaDataDesciption or IPageMetaDataDesciption")]
	public interface IAssociationDescription : IData
	{
        [StoreFieldType(PhysicalStoreFieldType.Guid)]
        [ImmutableFieldId("{41102D5D-4FC3-468f-B938-D40D08F82389}")]
        Guid VisabilityForeignKey { get; set; }
	}
}
