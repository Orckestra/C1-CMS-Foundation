using System;
using System.Collections.ObjectModel;
using System.Globalization;
using Composite.Data;
using Composite.Data.Types;

using OriginalPageManager = Composite.Data.Types.PageManager;

namespace Composite.Core.Implementation.Pages
{
#warning MRJ: Delete this file
    /*internal sealed class DefaultPageManager : IPageManager
    {
        private readonly DataScopeIdentifier _dataScopeIdentifier;
        private readonly CultureInfo _locale;

        public DefaultPageManager(PublicationScope publicationScope, CultureInfo cultureInfo)
        {
            if (cultureInfo == null) cultureInfo = LocalizationScopeManager.CurrentLocalizationScope;

            _locale = cultureInfo;
            _dataScopeIdentifier = DataScopeIdentifier.FromPublicationScope(publicationScope);
        }

        public IPage GetPageById(Guid id)
        {
            using (new DataScope(_dataScopeIdentifier, _locale))
            {
                return OriginalPageManager.GetPageById(id);
            }
        }

        public Guid GetParentId(Guid pageId)
        {
            using (new DataScope(_dataScopeIdentifier, _locale))
            {
                return OriginalPageManager.GetParentId(pageId);
            }
        }

        public int GetLocalOrdering(Guid pageId)
        {
            using (new DataScope(_dataScopeIdentifier, _locale))
            {
                return OriginalPageManager.GetLocalOrdering(pageId);
            }
        }

        public ReadOnlyCollection<Guid> GetChildrenIds(Guid pageId)
        {
            using (new DataScope(_dataScopeIdentifier, _locale))
            {
                return OriginalPageManager.GetChildrenIDs(pageId);
            }
        }

        public ReadOnlyCollection<IPagePlaceholderContent> GetPlaceholdersContent(Guid pageId)
        {
            using (new DataScope(_dataScopeIdentifier, _locale))
            {
                return OriginalPageManager.GetPlaceholderContent(pageId);
            }
        }
    }*/
}
