using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Data;
using Composite.Extensions;
using Composite.Data.Types;


namespace Composite.Tests.Linq
{
    public partial class LinqTest : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            using (new DataScope(DataScopeIdentifier.Administrated, new CultureInfo("en-US")))
            {
                int usersCount = 
                (from user in DataFacade.GetData<IUser>()
                 select user).Count();

                usersCount = DataFacade.GetData<IUser>().Count();

                // Simple selects tests
                IUser aUser = DataFacade.GetData<IUser>().First();
                aUser = DataFacade.GetData<IUser>().FirstOrDefault();
                aUser = (from u in DataFacade.GetData<IUser>()
                            select u).FirstOrDefault();
                //  Property "Last" isn't supported by linq2sql
                // aUser = DataFacade.GetData<IUser>().Last();
                // aUser = DataFacade.GetData<IUser>().LastOrDefault();


                IUser adminUser = 
                    (from u in DataFacade.GetData<IUser>()
                    where u.Username == "Admin"
                    select u).FirstOrDefault();

                adminUser = DataFacade.GetData<IUser>().First(user => user.Username == "Admin");
                adminUser = DataFacade.GetData<IUser>().FirstOrDefault(user => user.Username == "Admin");
                adminUser = DataFacade.GetData<IUser>().Single(user => user.Username == "Admin");
                adminUser = DataFacade.GetData<IUser>().SingleOrDefault(user => user.Username == "Admin");

                //  Property "Last" isn't supported by linq2sql
                // adminUser = DataFacade.GetData<IUser>().Last(user => user.Username == "Admin");
                // adminUser = DataFacade.GetData<IUser>().LastOrDefault(user => user.Username == "Admin");

              
                var pages = DataFacade.GetData<IPage>(false);
                var pageStructs = DataFacade.GetData<IPageStructure>(false);
                var pagePlaceholders = DataFacade.GetData<IPagePlaceholderContent>(false);

                Response.Write("Pages count: " + pages.Count() + "<br/>");
                Response.Write("Page structs count: " + pageStructs.ToList().Count() + "<br/>");


                var crossJoin = (from page in pages
                                 from ps1 in pageStructs
                                 select new
                                 {
                                     page.Id,
                                     page.Title,
                                     ps1.LocalOrdering
                                 }).ToList();

                Response.Write("Cross-join, result size: " + crossJoin.Count + "<br/>");

                var innerJoin = (from page in pages
                                 from ps1 in pageStructs
                                 where page.Id == ps1.Id
                                 select new
                                 {
                                     Id = page.Id,
                                     title = page.Title,
                                     ordering = ps1.LocalOrdering
                                 }).ToList();

                Response.Write("Join by WHERE clause, result size: " + innerJoin.Count + "<br/>");

                var subqueryTest =
                (from page in pages
                join ps in pageStructs on page.Id equals ps.ParentId
                into children
                select new { page.Title, childrenCount = children.Count() });

                Response.Write("Using 'join' keyword and a subquery: " + subqueryTest.ToList().Count() + "<br/>");


                var subqueryTest2 =
                (from page in pages
                 join ps in pageStructs on page.Id equals ps.ParentId into children
                 join pc in pagePlaceholders on page.Id equals pc.PageId into placeHolders
                 select new { page.Title, childrenCount = children.Count(), placeHolderCount = placeHolders.Count() });

                Response.Write("Subqueries to 2 tables: " + subqueryTest2.ToList().Count() + "<br/>");

                var leftOuterJoin =
                    (from page in pages
                     join pl in pagePlaceholders on page.Id equals pl.PageId 
                          into placeholders
                     from p in placeholders.DefaultIfEmpty()
                     orderby page.Title
                     select new { page.Id, page.Title, p.Content });


                Response.Write("Left outer join results: " + leftOuterJoin.ToList().Count() + "<br/>");

                var leftOuterJoinWithLetStatement =
                    (from page in pages
                     join pl in pagePlaceholders on page.Id equals pl.PageId into placeholders
                     let z = "Title = " + page.Title
                        from p in placeholders
                     orderby z
                     select new { page.Id, z, p.Content });

                Response.Write("Left join with 'let' statement: " + leftOuterJoinWithLetStatement.ToList().Count() + "<br/>");

                var innerJoinNullableKey =
                                (from page in pages
                                 join ps in pageStructs on page.Id equals (Guid?)ps.ParentId
                                 into children
                                 select new { page.Title, childrenCount = children.Count() });

                Response.Write("Subquery with nullable key: " + innerJoinNullableKey.ToList().Count + "<br/>");

                var joinByCompositeKey = 
                    from parentPage in pages
                    from childPage in pages
                    join pageStruct in pageStructs
                      on new { Id = parentPage.Id, ChildId = childPage.Id } equals new
                    {
                        Id = pageStruct.ParentId,
                        ChildId = pageStruct.Id
                    } into structures
                    from str in structures
                    orderby parentPage.Title, parentPage.Id
                    select new { ParentPageId = parentPage.Id, parentPage.Title, ChildPageTitle = childPage.Title, str.LocalOrdering };


                Response.Write("Join by a composite key (many X many relation): " + joinByCompositeKey.ToList().Count + "<br/>");

                var randomPages = GetRandomData(pages, 5);
                Response.Write("Getting random pages: " + randomPages.ToList().Count + "<br/>");

                var randomPageTitles = GetRandomData(pages, 5).Select(page => page.Title);
                Response.Write("Getting titles of random pages: " + randomPageTitles.ToList().Count + "<br/>");

                var someotherRandomPages = GetRandomData(pages, 10);
                var unitedSetsOrRandomPages = randomPages.Union(someotherRandomPages);
                Response.Write("Union of 5 and 10 randomly selected pages: " + unitedSetsOrRandomPages.ToList().Count + "<br/>");

                var titlesOfUnionOfPages = randomPages.Union(someotherRandomPages).Select(page => page.Title);
                Response.Write("Titles of a union of two sets of randomly selected pages: " + titlesOfUnionOfPages.ToList().Count + "<br/>");

                var randomPages2 = pages.TakeRandom(25);
                // IQueryableExtensions.TakeRandom(pages, 5);7
                Response.Write("Getting random pages (2): " + randomPages2.ToList().Count + "<br/>");

                var randomPageTitles2 = pages.TakeRandom(25).Select(page => page.Title);
                Response.Write("Getting titles of random pages(2): " + randomPageTitles2.ToList().Count + "<br/>");

                var randomPages3 = pages.Where(page => page.UrlTitle != "Test").TakeRandom(25);
                // IQueryableExtensions.TakeRandom(pages, 5);7
                Response.Write("Filtering + getting random pages (2): " + randomPages3.ToList().Count + "<br/>");

                // XmlProviderTest
                var aaa = DataFacade.GetData<IPage>(true).TakeRandom(25).Select(page => page.Title);
                randomPageTitles2.ToList();
            }
        }

        public IQueryable<T> GetRandomData<T>(IQueryable<T> source, int fetchCount) where T : IData
        {
            IQueryable<T> randomizedIQueryable = null;
            int totalItemCount = source.Count();

            if (totalItemCount <= fetchCount)
            {
                randomizedIQueryable = source;
            }
            else
            {
                foreach (int nextIndex in GetUniqueRandomSequence(0, totalItemCount - 1, fetchCount))
                {
                    IQueryable<T> itemAtIndex = source.Skip(nextIndex).Take(1);
                    randomizedIQueryable = (randomizedIQueryable == null
                        ? itemAtIndex
                        : randomizedIQueryable.Concat(itemAtIndex));
                }
            }

            return randomizedIQueryable;
        }


        public IEnumerable<int> GetUniqueRandomSequence(int minValue, int maxValue, int count)
        {
            if (minValue + count > maxValue + 1) throw new InvalidOperationException("'count' exceed number of possible unique random values");

            List<int> usedNumbers = new List<int>(count);
            Random random = new Random();
            while (usedNumbers.Count < count)
            {
                int randomInt = random.Next(minValue, maxValue);
                if (usedNumbers.Contains(randomInt) == false)
                {
                    usedNumbers.Add(randomInt);
                    yield return randomInt;
                }
            }
        }
    }
}
