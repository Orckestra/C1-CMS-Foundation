using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.C1Console.Trees;
using Composite.C1Console.Users;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Data.ProcessControlled;
using Composite.Data.Transactions;


namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public static class PageServices
    {
        private static readonly object _lock = new object();

        /// <exclude />
        public static Guid GetParentId(this IPage page)
        {
            Verify.ArgumentNotNull(page, nameof(page));
            Verify.ArgumentCondition(page.DataSourceId.ExistsInStore, nameof(page),
                "The given data have not been added yet");

            return PageManager.GetParentId(page.Id);
        }


        /// <exclude />
        public static int GetLocalOrdering(this IPage page)
        {
            Verify.ArgumentNotNull(page, nameof(page));
            Verify.ArgumentCondition(page.DataSourceId.ExistsInStore, nameof(page),
                "The given data have not been added yet");

            using (new DataScope(DataScopeIdentifier.Administrated))
            {
                return PageManager.GetLocalOrdering(page.Id);
            }
        }


        /// <exclude />
        public static IQueryable<IPage> GetChildren(this IPage page)
        {
            Verify.ArgumentNotNull(page, nameof(page));
            Verify.ArgumentCondition(page.DataSourceId.ExistsInStore, nameof(page),
                "The given data have not been added yet");

            return GetChildren(page.Id);
        }


        /// <exclude />
        public static IQueryable<IPage> GetChildren(Guid parentId)
        {
            var structure = DataFacade.GetData<IPageStructure>();
            var pages = DataFacade.GetData<IPage>();

            if (structure.IsEnumerableQuery() && pages.IsEnumerableQuery())
            {
                return (from ps in structure.AsEnumerable()
                       where ps.ParentId == parentId
                       join p in pages.AsEnumerable() on ps.Id equals p.Id
                       orderby ps.LocalOrdering
                       select p).AsQueryable();
            }

            return from ps in structure
                   where ps.ParentId == parentId
                   join p in pages on ps.Id equals p.Id
                   orderby ps.LocalOrdering
                   select p;

#warning revisit this - we return all versions (by design so far). Any ordering on page versions? - check history for original intent
        }


        /// <exclude />
        public static int GetChildrenCount(Guid parentId)
        {
            using (new DataScope(DataScopeIdentifier.Administrated))
            {
                return PageManager.GetChildrenIDs(parentId).Count;
            }
        }


        /// <exclude />
        public static bool IsChildrenAlphabeticOrdered(Guid parentId)
        {
            lock (_lock)
            {
                var pageIds = PageManager.GetChildrenIDs(parentId);

                if (pageIds.Count == 0) return true;

                IPage firstPage = PageManager.GetPageById(pageIds[0], true);

                for (int i = 1; i < pageIds.Count; i++)
                {
                    IPage currentPage = PageManager.GetPageById(pageIds[i], true);

                    if (((firstPage != null) && (currentPage != null)) &&
                        (string.Compare(firstPage.Title, currentPage.Title, true, UserSettings.CultureInfo) > 0))
                    {
                        return false;
                    }

                    if (currentPage != null)
                    {
                        firstPage = currentPage;
                    }
                }

                return true;
            }
        }


        /// <exclude />
        public static IPage GetPageFromLocalOrder(Guid parentId, int localOrder)
        {
            Guid pageId;
            using (new DataScope(DataScopeIdentifier.Administrated))
            {
// FirstOrDefault used here because local ordering could be "corrupt"
                IPageStructure pageStructure =
                    (from ps in DataFacade.GetData<IPageStructure>()
                        where ps.ParentId == parentId &&
                              ps.LocalOrdering == localOrder
                        select ps).FirstOrDefault();

                if (pageStructure == null) return null;

                pageId = pageStructure.Id;
            }

            return DataFacade.GetData<IPage>(f => f.Id == pageId).FirstOrDefault();
        }



        /// <exclude />
        [Obsolete("Use Add() method instead")]
        public static IPage AddPageAtTop(this IPage newPage, Guid parentId)
        {
            return AddPageAtTop(newPage, parentId, true);
        }



        /// <exclude />
        [Obsolete("Use Add() method instead")]
        public static IPage AddPageAtTop(this IPage newPage, Guid parentId, bool addNewPage)
        {
            return newPage.InsertIntoPosition(parentId, 0, addNewPage);
        }



        /// <exclude />
        [Obsolete("Use Add() method instead")]
        public static IPage AddPageAtBottom(this IPage newPage, Guid parentId)
        {
            return AddPageAtBottom(newPage, parentId, true);
        }



        /// <exclude />
        [Obsolete("Use Add() method instead")]
        public static IPage AddPageAtBottom(this IPage newPage, Guid parentId, bool addNewPage)
        {
            Verify.ArgumentNotNull(newPage, nameof(newPage));

            lock (_lock)
            {
                PageInsertPosition.Bottom.CreatePageStructure(newPage, parentId);

                return addNewPage ? DataFacade.AddNew<IPage>(newPage) : newPage;
            }
        }


        /// <summary>
        /// Adds a page to the specified position.
        /// </summary>
        /// <param name="newPage">The new page to be added.</param>
        /// <param name="parentId">The parent id.</param>
        /// <param name="pageInsertionPosition">The page insertion position</param>
        /// <returns></returns>
        public static IPage Add(this IPage newPage, Guid parentId, IPageInsertionPosition pageInsertionPosition)
        {
            Verify.ArgumentNotNull(newPage, nameof(newPage));
            Verify.ArgumentNotNull(pageInsertionPosition, nameof(pageInsertionPosition));

            lock (_lock)
            {
                pageInsertionPosition.CreatePageStructure(newPage, parentId);

                newPage = DataFacade.AddNew<IPage>(newPage);

                AddPageTypeRelatedData(newPage);
            }

            return newPage;
        }


        /// <exclude />
        [Obsolete("Use Add() method instead")]
        public static IPage AddPageAlphabetic(this IPage newPage, Guid parentId)
        {
            Verify.ArgumentNotNull(newPage, nameof(newPage));

            lock (_lock)
            {
                PageInsertPosition.Alphabetic.CreatePageStructure(newPage, parentId);

                return DataFacade.AddNew<IPage>(newPage);
            }
        }



        /// <exclude />
        [Obsolete("Use Add() method instead")]
        public static IPage AddPageAfter(this IPage newPage, Guid parentId, Guid existingPageId)
        {
            return AddPageAfter(newPage, parentId, existingPageId, true);
        }



        /// <exclude />
        public static IPage MoveTo(this IPage page, Guid parentId, int localOrder, bool addNewPage)
        {
            Verify.ArgumentNotNull(page, nameof(page));

            lock (_lock)
            {
                IPageStructure pageStructure = DataFacade.GetData<IPageStructure>(f => f.Id == page.Id).FirstOrDefault();

                if (pageStructure != null)
                {
                    if (pageStructure.ParentId == parentId)
                    {
                        if (localOrder == pageStructure.LocalOrdering)
                        {
                            // If page is already has the right order - don't do anything
                            return page;
                        }
                        if (localOrder > pageStructure.LocalOrdering)
                        {
                            localOrder--;
                        }
                    }
                    DataFacade.Delete(pageStructure);

                    if (pageStructure.ParentId != parentId)
                    {
                        FixOrder(pageStructure.ParentId);
                    }
                }

                return InsertIntoPosition(page, parentId, localOrder, addNewPage);
            }
        }

        private static void FixOrder(Guid parentId)
        {
            List<IPageStructure> pageStructures =
                DataFacade.GetData<IPageStructure>(ps => ps.ParentId == parentId).ToList();

            pageStructures = pageStructures.OrderBy(ps => ps.LocalOrdering).ToList();

            for (int i = pageStructures.Count - 1; i >= 0; i--)
            {
                if (pageStructures[i].LocalOrdering == i) // If order is correct, skipping the page structure object
                {
                    pageStructures.RemoveAt(i);
                    continue;
                }

                pageStructures[i].LocalOrdering = i;
            }

            if (pageStructures.Count == 0) return;

            DataFacade.Update(pageStructures);
        }

        /// <exclude />
        public static IPage InsertIntoPosition(this IPage newPage, Guid parentId, int localOrder, bool addNewPage)
        {
            Verify.ArgumentNotNull(newPage, nameof(newPage));

            lock (_lock)
            {
                InsertIntoPositionInternal(newPage.Id, parentId, localOrder);

                return addNewPage ? DataFacade.AddNew(newPage) : newPage;
            }
        }


        internal static void InsertIntoPositionInternal(Guid newPageId, Guid parentId, int localOrder)
        {
            List<IPageStructure> pageStructures =
                (from ps in DataFacade.GetData<IPageStructure>(false)
                    where ps.ParentId == parentId
                    orderby ps.LocalOrdering
                    select ps).ToList();

            var toBeUpdated = new List<IData>();
            for (int i = 0; i < pageStructures.Count; i++)
            {
                int newSortOrder = i < localOrder ? i : i + 1;
                if (pageStructures[i].LocalOrdering != newSortOrder)
                {
                    pageStructures[i].LocalOrdering = newSortOrder;
                    toBeUpdated.Add(pageStructures[i]);
                }
            }

            DataFacade.Update(toBeUpdated);

            if (localOrder > pageStructures.Count)
            {
                localOrder = pageStructures.Count;
            }

            var newPageStructure = DataFacade.BuildNew<IPageStructure>();
            newPageStructure.Id = newPageId;
            newPageStructure.ParentId = parentId;
            newPageStructure.LocalOrdering = localOrder;

            DataFacade.AddNew(newPageStructure);
        }


        /// <exclude />
        public static IPage AddPageAfter(this IPage newPage, Guid parentId, Guid existingPageId, bool addNewPage)
        {
            Verify.ArgumentNotNull(newPage, nameof(newPage));

            lock (_lock)
            {
                PageInsertPosition.After(existingPageId).CreatePageStructure(newPage, parentId);

                if (addNewPage)
                {
                    return DataFacade.AddNew<IPage>(newPage);
                }
                return newPage;
            }
        }



        /// <exclude />
        public static IEnumerable<IPage> GetSubChildren(this IPage parentPage)
        {
            Verify.ArgumentNotNull(parentPage, nameof(parentPage));

            lock (_lock)
            {
                foreach (IPage childPage in parentPage.GetChildren())
                {
                    yield return childPage;

                    foreach (IPage subPage in childPage.GetSubChildren())
                    {
                        yield return subPage;
                    }
                }
            }
        }

        /// <summary>
        /// This method will delete the pagestructure corresponding to the given page if this 
        /// page is the last page.
        /// </summary>
        /// <param name="page">The page that is about to be deleted.</param>
        public static void DeletePageStructure(this IPage page)
        {
            DeletePageStructure(page, true);
        }

        
        internal static void DeletePageStructure(this IPage page, bool updateSiblingsOrder)
        {
            if (ExistsInOtherLocale(page))
            {
                return;
            }

            var structureInfo = DataFacade.GetData<IPageStructure>(false).SingleOrDefault(f => f.Id == page.Id);
            if (structureInfo == null)
            {
                return;
            }

            int localOrdering = structureInfo.LocalOrdering;
            DataFacade.Delete<IPageStructure>(structureInfo);

            if (!updateSiblingsOrder) return;

            List<IPageStructure> siblings =
                DataFacade.GetData<IPageStructure>(
                    f => f.ParentId == structureInfo.ParentId && f.LocalOrdering >= localOrdering).ToList();

            // If there's a page with the same local ordering - we're not changing anything
            if (siblings.Count == 0
                || siblings.Any(ps => ps.LocalOrdering == localOrdering))
            {
                return;
            }

            foreach (IPageStructure sibling in siblings)
            {
                sibling.LocalOrdering--;
                DataFacade.Update(sibling);
            }
        }




        private static bool ExistsInOtherLocale(IPage page)
        {
            var otherLocales =
                DataLocalizationFacade.ActiveLocalizationCultures.Except(new[] {page.DataSourceId.LocaleScope});
            foreach (CultureInfo cultureInfo in otherLocales)
            {
                using (new DataScope(cultureInfo))
                {
                    bool exists = DataFacade.GetData<IPage>(f => f.Id == page.Id).Any();
                    if (exists)
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        /// <summary>
        /// Gets a default page type id for a given page type, if available.
        /// </summary>
        /// <param name="pageTypeId"></param>
        public static Guid? GetDefaultPageTemplateId(Guid pageTypeId)
        {
            IPageType pageType = DataFacade.GetData<IPageType>().Single(f => f.Id == pageTypeId);

            if (pageType.DefaultTemplateId != Guid.Empty)
            {
                return pageType.DefaultTemplateId;
            }
            var templateRestrictions = DataFacade.GetData<IPageTypePageTemplateRestriction>()
                .Where(f => f.PageTypeId == pageTypeId);

            return templateRestrictions.FirstOrDefault()?.PageTemplateId;
        }


        /// <summary>
        /// Creates page type related data for a newly created IPage, based on a given page type id.
        /// Including: default placeholder content, page folders, page applications.
        /// </summary>
        /// <param name="page"></param>
        public static void AddPageTypeRelatedData(IPage page)
        {
            Guid pageTypeId = page.PageTypeId;

            Verify.That(pageTypeId != Guid.Empty, "PageTypeId field should not be Guid.Empty");

            // Adding default page content
            IEnumerable<IPageTypeDefaultPageContent> pageTypeDefaultPageContents =
                DataFacade.GetData<IPageTypeDefaultPageContent>().
                    Where(f => f.PageTypeId == pageTypeId).
                    Evaluate();

            foreach (IPageTypeDefaultPageContent pageTypeDefaultPageContent in pageTypeDefaultPageContents)
            {
                IPagePlaceholderContent pagePlaceholderContent = DataFacade.BuildNew<IPagePlaceholderContent>();
                pagePlaceholderContent.PageId = page.Id;
                pagePlaceholderContent.VersionId = page.VersionId;
                pagePlaceholderContent.PlaceHolderId = pageTypeDefaultPageContent.PlaceHolderId;
                pagePlaceholderContent.Content = pageTypeDefaultPageContent.Content;
                DataFacade.AddNew<IPagePlaceholderContent>(pagePlaceholderContent);
            }

            AddPageTypePageFoldersAndApplications(page);
        }

        /// <summary>
        /// Deletes the versions of the given page in its current localization scope.
        /// </summary>
        public static void DeletePage(IPage page)
        {
            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                using (var conn = new DataConnection())
                {
                    conn.DisableServices();

                    var cultures = DataLocalizationFacade.ActiveLocalizationCultures.ToList();
                    cultures.Remove(page.DataSourceId.LocaleScope);

                    List<IPage> pagesToDelete = page.GetSubChildren().ToList();

                    foreach (IPage childPage in pagesToDelete)
                    {
                        if (!ExistInOtherLocale(cultures, childPage))
                        {
                            RemoveAllFolderAndMetaDataDefinitions(childPage);
                        }

                        childPage.DeletePageStructure(false);
                        ProcessControllerFacade.FullDelete(childPage);
                    }


                    if (!ExistInOtherLocale(cultures, page))
                    {
                        RemoveAllFolderAndMetaDataDefinitions(page);
                    }

                    page.DeletePageStructure();

                    Guid pageId = page.Id;
                    var pageVersions = DataFacade.GetData<IPage>(p => p.Id == pageId).ToList();

                    ProcessControllerFacade.FullDelete(pageVersions);
                }

                transactionScope.Complete();
            }
        }

        private static bool ExistInOtherLocale(List<CultureInfo> cultures, IPage page)
        {
            foreach (CultureInfo localeCultureInfo in cultures)
            {
                using (new DataScope(localeCultureInfo))
                {
                    if (Composite.Data.PageManager.GetPageById(page.Id) != null)
                    {
                        return true;
                    }
                }
            }

            return false;
        }


        private static void RemoveAllFolderAndMetaDataDefinitions(IPage page)
        {
            foreach (Type folderType in page.GetDefinedFolderTypes())
            {
                page.RemoveFolderDefinition(folderType, true);
            }

            foreach (Tuple<Type, string> metaDataTypeAndName in page.GetDefinedMetaDataTypeAndNames())
            {
                page.RemoveMetaDataDefinition(metaDataTypeAndName.Item2, true);
            }
        }

        /// <summary>
        /// Delete the specific version of the page in the current localization scope.
        /// </summary>
        /// <param name="pageId"></param>
        /// <param name="versionId"></param>
        /// <param name="locale"></param>
        public static void DeletePage(Guid pageId, Guid versionId, CultureInfo locale)
        {
            Verify.ArgumentNotNull(locale, nameof(locale));

            using (var conn = new DataConnection(PublicationScope.Unpublished, locale))
            {
                var pages = conn.Get<IPage>().Where(p => p.Id == pageId).ToList();
                if (pages.Count == 1 && pages[0].VersionId == versionId)
                {
                    DeletePage(pages[0]);
                    return;
                }
            }

            var publicationScopes = new[] {PublicationScope.Published, PublicationScope.Unpublished};

            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                foreach (var publicationScope in publicationScopes)
                {
                    using (var conn = new DataConnection(publicationScope, locale))
                    {
                        var pageToDelete = conn.Get<IPage>()
                            .SingleOrDefault(p => p.Id == pageId && p.VersionId == versionId);

                        var placeholders = conn.Get<IPagePlaceholderContent>()
                            .Where(p => p.PageId == pageId && p.VersionId == versionId).ToList();

                        if (placeholders.Any())
                        {
                            DataFacade.Delete(placeholders, false, false);
                        }

                        if (pageToDelete != null)
                        {
                            DataFacade.Delete(pageToDelete);
                        }
                    }
                }

                transactionScope.Complete();
            }
        }


        internal static bool AddPageTypePageFoldersAndApplications(IPage page)
        {
#warning Validate that having a page type with associated PageType PageFolders or Applications does not break on 2nd add for same page id

            Guid pageTypeId = page.PageTypeId;

            bool treeRefreshindNeeded = false;

            // Adding page folders
            IEnumerable<IPageTypeDataFolderTypeLink> pageTypeDataFolderTypeLinks =
                DataFacade.GetData<IPageTypeDataFolderTypeLink>().
                    Where(f => f.PageTypeId == pageTypeId).
                    Evaluate().
                    RemoveDeadLinks();

            foreach (IPageTypeDataFolderTypeLink pageTypeDataFolderTypeLink in pageTypeDataFolderTypeLinks)
            {
                page.AddFolderDefinition(pageTypeDataFolderTypeLink.DataTypeId);
                treeRefreshindNeeded = true;
            }


            // Adding applications
            IEnumerable<IPageTypeTreeLink> pageTypeTreeLinks =
                DataFacade.GetData<IPageTypeTreeLink>().
                    Where(f => f.PageTypeId == pageTypeId).
                    Evaluate().
                    RemoveDeadLinks();


            var entityToken = page.GetDataEntityToken();
            foreach (IPageTypeTreeLink pageTypeTreeLink in pageTypeTreeLinks)
            {
                var tree = TreeFacade.GetTree(pageTypeTreeLink.TreeId);
                if (tree.HasAttachmentPoints(entityToken)) continue;

                TreeFacade.AddPersistedAttachmentPoint(pageTypeTreeLink.TreeId, typeof(IPage), page.Id);
                treeRefreshindNeeded = true;
            }

            return treeRefreshindNeeded;
        }
    }
}
