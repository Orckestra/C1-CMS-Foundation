using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Users;


namespace Composite.Data.Types
{
    internal static class PageServices
    {
        private static readonly object _lock = new object();

        public static Guid GetParentId(this IPage page)
        {
            Verify.ArgumentNotNull(page, "page");
            Verify.ArgumentCondition(page.DataSourceId.ExistsInStore, "page", "The given data have not been added yet");

            return PageManager.GetParentId(page.Id);
        }

        public static int GetLocalOrdering(this IPage page)
        {
            Verify.ArgumentNotNull(page, "page");
            Verify.ArgumentCondition(page.DataSourceId.ExistsInStore, "page", "The given data have not been added yet");

            using (new DataScope(DataScopeIdentifier.Administrated))
            {
                return PageManager.GetLocalOrdering(page.Id);
            }
        }

        public static IQueryable<IPage> GetChildren(this IPage page)
        {
            Verify.ArgumentNotNull(page, "page");
            Verify.ArgumentCondition(page.DataSourceId.ExistsInStore, "page", "The given data have not been added yet");

            return GetChildren(page.Id);
        }

        public static IQueryable<IPage> GetChildren(Guid parentId)
        {
            var pageIDs = PageManager.GetChildrenIDs(parentId);

            var result = new List<IPage>();
            foreach(var id in pageIDs)
            {
                var page =  PageManager.GetPageById(id);
                // A page can de deleted after getting the child list, in a separate thread
                if (page != null)
                {
                    result.Add(page);
                }
            }

            return result.AsQueryable();
        }



        public static int GetChildrenCount(Guid parentId)
        {
            using (new DataScope(DataScopeIdentifier.Administrated))
            {
                return PageManager.GetChildrenIDs(parentId).Count;
            }
        }

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



        public static IPage GetPageFromLocalOrder(Guid parentId, int localOrder)
        {
            Guid pageId;
            using (DataScope dataScope = new DataScope(DataScopeIdentifier.Administrated))
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



        public static IPage AddPageAtTop(this IPage newPage, Guid parentId)
        {
            return AddPageAtTop(newPage, parentId, true);
        }



        public static IPage AddPageAtTop(this IPage newPage, Guid parentId, bool addNewPage)
        {
            return newPage.InsertIntoPosition(parentId, 0, addNewPage);
        }



        public static IPage AddPageAtBottom(this IPage newPage, Guid parentId)
        {
            return AddPageAtBottom(newPage, parentId, true);
        }



        public static IPage AddPageAtBottom(this IPage newPage, Guid parentId, bool addNewPage)
        {
            if (newPage == null) throw new ArgumentNullException("newPage");

            lock (_lock)
            {
                int siblingPageCount =
                    (from ps in DataFacade.GetData<IPageStructure>()
                     where ps.ParentId == parentId
                     select ps).Count();

                IPageStructure newPageStructure = DataFacade.BuildNew<IPageStructure>();
                newPageStructure.ParentId = parentId;
                newPageStructure.Id = newPage.Id;
                newPageStructure.LocalOrdering = siblingPageCount;
                DataFacade.AddNew<IPageStructure>(newPageStructure);

                return addNewPage ? DataFacade.AddNew<IPage>(newPage) : newPage;
            }
        }



        public static IPage AddPageAlphabetic(this IPage newPage, Guid parentId)
        {
            if (newPage == null) throw new ArgumentNullException("newPage");

            lock (_lock)
            {
                List<IPageStructure> pageStructures =
                    (from ps in DataFacade.GetData<IPageStructure>()
                     where ps.ParentId == parentId
                     orderby ps.LocalOrdering
                     select ps).ToList();

                CultureInfo cultureInfo = UserSettings.CultureInfo;

                int targetLocalOrdering = -1;

                foreach (IPageStructure pageStructure in pageStructures)
                {
                    if(targetLocalOrdering != -1)
                    {
                        pageStructure.LocalOrdering++;
                        continue;
                    }

                    IPage page =
                        (from p in DataFacade.GetData<IPage>()
                         where p.Id == pageStructure.Id
                         select p).SingleOrDefault();

                    if (page == null)
                    {
                        continue;
                    }

                    if (string.Compare(page.Title, newPage.Title, true, cultureInfo) > 0)
                    {
                        targetLocalOrdering = pageStructure.LocalOrdering;
                        pageStructure.LocalOrdering++;
                    }
                }

                if(targetLocalOrdering == -1)
                {
                    targetLocalOrdering = pageStructures.Last().LocalOrdering + 1;
                } 
                else
                {
                    DataFacade.Update(pageStructures.Where(page => page.LocalOrdering > targetLocalOrdering).Cast<IData>());
                }

                IPageStructure newPageStructure = DataFacade.BuildNew<IPageStructure>();
                newPageStructure.ParentId = parentId;
                newPageStructure.Id = newPage.Id;
                newPageStructure.LocalOrdering = targetLocalOrdering;
                DataFacade.AddNew<IPageStructure>(newPageStructure);

                return DataFacade.AddNew<IPage>(newPage);
            }
        }



        public static IPage AddPageAfter(this IPage newPage, Guid parentId, Guid existingPageId)
        {
            return AddPageAfter(newPage, parentId, existingPageId, true);
        }

        public static IPage MoveTo(this IPage page, Guid parentId, int localOrder, bool addNewPage)
        {
            Verify.ArgumentNotNull(page, "page");

            lock (_lock)
            {
                IPageStructure pageStructure = DataFacade.GetData<IPageStructure>(f => f.Id == page.Id).FirstOrDefault();

                if(pageStructure != null)
                {
                    if (pageStructure.ParentId == parentId)
                    {
                        if(localOrder == pageStructure.LocalOrdering)
                        {
                            // If page is already has the right order - don't do anything
                            return page;
                        }
                        if(localOrder > pageStructure.LocalOrdering)
                        {
                            localOrder--;
                        }
                    }
                    DataFacade.Delete(pageStructure);
                }

                return InsertIntoPosition(page, parentId, localOrder, addNewPage);
            }
        }


        public static IPage InsertIntoPosition(this IPage newPage, Guid parentId, int localOrder, bool addNewPage)
        {
            Verify.ArgumentNotNull(newPage, "newPage");

            lock (_lock)
            {
                List<IPageStructure> pageStructures =
                    (from ps in DataFacade.GetData<IPageStructure>(false)
                     where ps.ParentId == parentId
                     orderby ps.LocalOrdering
                     select ps).ToList();

                var toBeUpdated = new List<IData>();
                for(int i=0; i < pageStructures.Count; i++)
                {
                    int newSortOrder = i < localOrder ? i : i + 1;
                    if(pageStructures[i].LocalOrdering != newSortOrder)
                    {
                        pageStructures[i].LocalOrdering = newSortOrder;
                        toBeUpdated.Add(pageStructures[i]);
                    }
                }

                DataFacade.Update(toBeUpdated);

                if(localOrder > pageStructures.Count)
                {
                    localOrder = pageStructures.Count;
                }

                var newPageStructure = DataFacade.BuildNew<IPageStructure>();
                newPageStructure.Id = newPage.Id;
                newPageStructure.ParentId = parentId;
                newPageStructure.LocalOrdering = localOrder;

                DataFacade.AddNew(newPageStructure);

                return addNewPage ? DataFacade.AddNew(newPage) : newPage;
            }
        }


        public static IPage AddPageAfter(this IPage newPage, Guid parentId, Guid existingPageId, bool addNewPage)
        {
            if (newPage == null) throw new ArgumentNullException("newPage");

            lock (_lock)
            {
                List<IPageStructure> pageStructures =
                    (from ps in DataFacade.GetData<IPageStructure>()
                     where ps.ParentId == parentId
                     orderby ps.LocalOrdering
                     select ps).ToList();

                bool pageInserted = false;
                foreach (IPageStructure pageStructure in pageStructures)
                {
                    if (pageInserted == false)
                    {
                        if (pageStructure.Id == existingPageId)
                        {
                            IPageStructure newPageStructure = DataFacade.BuildNew<IPageStructure>();
                            newPageStructure.ParentId = parentId;
                            newPageStructure.Id = newPage.Id;
                            newPageStructure.LocalOrdering = pageStructure.LocalOrdering + 1;
                            DataFacade.AddNew<IPageStructure>(newPageStructure);

                            pageInserted = true;
                        }
                    }
                    else
                    {
                        pageStructure.LocalOrdering += 1;
                    }
                }

                DataFacade.Update(pageStructures.Cast<IData>());

                if (addNewPage == true)
                {
                    return DataFacade.AddNew<IPage>(newPage);
                }
                else
                {
                    return newPage;
                }
            }
        }



        public static IEnumerable<IPage> GetSubChildren(this IPage parentPage)
        {
            if (parentPage == null) throw new ArgumentNullException("parentPage");

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
        /// This method will delete the pagestructure corrosponding to the given page if this 
        /// page is the last page.
        /// </summary>
        /// <param name="page">The page that is about to be deleted.</param>
        public static void DeletePageStructure(this IPage page)
        {
            if (ExistsInOtherLocale(page))
            {
                return;
            }
            IPageStructure structureInfo = DataFacade.GetData<IPageStructure>(f => f.Id == page.Id).SingleOrDefault();

            if (structureInfo == null)
            {
                return;
            }

            int localOrdering = structureInfo.LocalOrdering;
            DataFacade.Delete<IPageStructure>(structureInfo);

            List<IPageStructure> siblings = DataFacade.GetData<IPageStructure>(f => f.ParentId == structureInfo.ParentId && f.LocalOrdering >= localOrdering).ToList();

            // If there's a page with the same local ordering - we're not changing anything
            if (siblings.Count == 0
                || siblings.Any(ps => ps.LocalOrdering == localOrdering))
            {
                return;
            }

            for (int i = 0; i < siblings.Count; i++)
            {
                siblings[i].LocalOrdering--;
                DataFacade.Update(siblings[i]);
            }
        }




        private static bool ExistsInOtherLocale(IPage page)
        {
            foreach (CultureInfo cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures.Except(new CultureInfo[] { page.DataSourceId.LocaleScope }))
            {
                using (DataScope dataScope = new DataScope(cultureInfo))
                {
                    bool exists = DataFacade.GetData<IPage>(f => f.Id == page.Id).Any();
                    if (exists == true)
                    {
                        return true;
                    }
                }
            }

            return false;
        }
    }
}
