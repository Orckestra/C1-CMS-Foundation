using System;
using Composite.Data.Types;
using Composite.StringExtensions;


namespace Composite.Data.Hierarchy.DataAncestorProviders
{
    internal sealed class PageDataAncestorProvider : IDataAncestorProvider
    {
        public IData GetParent(IData data)
        {
            Verify.ArgumentNotNull(data, "data");
            IPage page = (IPage)data;

            Verify.IsNotNull(page, "Only '{0}' type is supported.".FormatWith(typeof(IPage).FullName));


            Guid parentId = PageManager.GetParentId(page.Id);

            if (parentId == Guid.Empty)
            {
                return null;
            }

            return PageManager.GetPageById(parentId);
        }
    }
}
