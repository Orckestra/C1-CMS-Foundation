using System;
using Composite.Core.Configuration;
using Composite.Data.Types;
using Composite.Core.Extensions;


namespace Composite.Data.Hierarchy.DataAncestorProviders
{
    internal sealed class PageDataAncestorProvider : IDataAncestorProvider
    {
        public IData GetParent(IData data)
        {
            Verify.ArgumentNotNull(data, "data");
            IPage page = data as IPage;

            Verify.IsNotNull(page, "Only '{0}' type is supported.".FormatWith(typeof(IPage).FullName));

            Guid parentId = PageManager.GetParentId(page.Id);
            if (parentId == Guid.Empty)
            {
                return null;
            }

            using (new DataScope(data.DataSourceId.LocaleScope))
            {
                var parent =  PageManager.GetPageById(parentId);
                if (parent == null && GlobalSettingsFacade.AllowChildPagesTranslationWithoutParent)
                {
                    while (parent == null)
                    {
                        parentId = PageManager.GetParentId(parentId);
                        if (parentId == Guid.Empty)
                        {
                            break;
                        }
                        parent = PageManager.GetPageById(parentId);
                    }
                }

                return parent;
            }
        }
    }
}
