using System;
using System.Globalization;
using Composite.Data;

namespace Composite.Core.Implementation.Pages
{
    public class PageManagerBase : ImplementationBase
    {
        public virtual IPageManager Create() { return null; }
        public virtual IPageManager Create(PublicationScope publicationScope) { return null; }
        public virtual IPageManager Create(PublicationScope publicationScope, CultureInfo locale) { return null; }
        public virtual IPageManager Create(CultureInfo locale) { return null; }
    }
}
