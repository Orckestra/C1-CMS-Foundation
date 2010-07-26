using System;
using System.Collections.Generic;
using Composite.Data;
using Composite.Pages;

namespace Composite.Implementation
{
    public class NavigationBase : ImplementationBase
    {
        public virtual XSiteMap GetSiteMap()
        {
            return null;
        }

        public virtual XPage GetCurrentPage()
        {
            return null;
        }


        public virtual IEnumerable<XPage> SelectPages(XPage page, PageSelection selectionType)
        {
            return null;
        }

        public virtual TMetaData GetMeta<TMetaData>(XPage page, string name) where TMetaData : class, IFAKEData
        {
            return null;
        }

        public virtual IEnumerable<TPageData> GetData<TPageData>(XPage page) where TPageData : class, IFAKEData
        {
            return new TPageData[0];
        }
    }
}