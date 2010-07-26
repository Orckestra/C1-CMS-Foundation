using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Xml.Linq;
using Composite.Data;

namespace Composite.Pages
{
    public class XSiteMap : XElement
    {
        protected internal XSiteMap(DataScopeIdentifier dataScope, CultureInfo cultureInfo): base("SiteMap")
        {
            DataScope = dataScope;
            CultureInfo = cultureInfo;
        }

        public IEnumerable<XPage> RootPages
        {
            get
            {
                return Elements();
            }
        }

        protected internal CultureInfo CultureInfo { get; set; }
        protected internal DataScopeIdentifier DataScope { get; set; }


        public new IEnumerable<XPage> Elements()
        {
            return base.Elements().Select(element => element as XPage);
        }

        public new IEnumerable<XPage> Descendants()
        {
            return base.Descendants().Select(element => element as XPage);
        }
    }
}

