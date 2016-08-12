using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Users;

namespace Composite.Data.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    public interface IPageInsertionPosition
    {
        /// <exclude />
        void CreatePageStructure(IPage page, Guid parentPageId);
    }

    /// <summary>
    /// Contains awailable page insertion positions
    /// </summary>
    public static class PageInsertPosition
    {
        /// <summary>
        /// The page will be added as the last page in the list of child pages.
        /// </summary>
        public static IPageInsertionPosition Bottom => new BottomPageInsertPosition();

        /// <summary>
        /// The page will be added as the first page in the list of child pages.
        /// </summary>
        public static IPageInsertionPosition Top => new TopPageInsertPosition();

        /// <summary>
        /// A page will be added with respect to the aplhabetic order.
        /// </summary>
        public static IPageInsertionPosition Alphabetic => new AlphabeticPageInsertPosition();

        /// <summary>
        /// The page will appear after a given page
        /// </summary>
        /// <param name="existingPageId">An existing page after which a new page should be inserted</param>
        /// <returns></returns>
        public static IPageInsertionPosition After(Guid existingPageId) => new AfterPageInsertPosition(existingPageId);


        internal class BottomPageInsertPosition : IPageInsertionPosition
        {
            public void CreatePageStructure(IPage page, Guid parentPageId)
            {
                int siblingPageCount =
                        (from ps in DataFacade.GetData<IPageStructure>()
                         where ps.ParentId == parentPageId
                         select ps).Count();

                IPageStructure newPageStructure = DataFacade.BuildNew<IPageStructure>();
                newPageStructure.ParentId = parentPageId;
                newPageStructure.Id = page.Id;
                newPageStructure.LocalOrdering = siblingPageCount;
                DataFacade.AddNew<IPageStructure>(newPageStructure);
            }
        }


        internal class TopPageInsertPosition : IPageInsertionPosition
        {
            public void CreatePageStructure(IPage page, Guid parentPageId)
            {
                PageServices.InsertIntoPositionInternal(page.Id, parentPageId, 0);
            }
        }

        internal class AlphabeticPageInsertPosition : IPageInsertionPosition
        {
            public void CreatePageStructure(IPage newPage, Guid parentPageId)
            {
                List<IPageStructure> pageStructures =
                        (from ps in DataFacade.GetData<IPageStructure>()
                         where ps.ParentId == parentPageId
                         orderby ps.LocalOrdering
                         select ps).ToList();

                var cultureInfo = UserSettings.CultureInfo;

                int targetLocalOrdering = -1;

                foreach (IPageStructure pageStructure in pageStructures)
                {
                    if (targetLocalOrdering != -1)
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

                if (targetLocalOrdering == -1)
                {
                    targetLocalOrdering = pageStructures.Last().LocalOrdering + 1;
                }
                else
                {
                    DataFacade.Update(pageStructures.Where(page => page.LocalOrdering > targetLocalOrdering));
                }

                var newPageStructure = DataFacade.BuildNew<IPageStructure>();
                newPageStructure.ParentId = parentPageId;
                newPageStructure.Id = newPage.Id;
                newPageStructure.LocalOrdering = targetLocalOrdering;
                DataFacade.AddNew(newPageStructure);
            }
        }

        internal class AfterPageInsertPosition : IPageInsertionPosition
        {
            private readonly Guid _existingPageId;

            public AfterPageInsertPosition(Guid existingPageId)
            {
                _existingPageId = existingPageId;
            }

            public void CreatePageStructure(IPage newPage, Guid parentPageId)
            {
                var pageStructures =
                    (from ps in DataFacade.GetData<IPageStructure>()
                     where ps.ParentId == parentPageId
                     orderby ps.LocalOrdering
                     select ps).ToList();

                bool pageInserted = false;
                foreach (IPageStructure pageStructure in pageStructures)
                {
                    if (!pageInserted)
                    {
                        if (pageStructure.Id == _existingPageId)
                        {
                            IPageStructure newPageStructure = DataFacade.BuildNew<IPageStructure>();
                            newPageStructure.ParentId = parentPageId;
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

                DataFacade.Update(pageStructures);
            }
        }
    }
}
