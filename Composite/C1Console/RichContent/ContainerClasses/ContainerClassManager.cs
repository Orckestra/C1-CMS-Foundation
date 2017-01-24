using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.C1Console.RichContent.ContainerClasses
{
    /// <summary>
    /// Services for working with Container Classes - a concept that allow you to attach styling to visual editors and filter Components
    /// </summary>
    public static class ContainerClassManager
    {
        /// <summary>
        /// Returns Container Classes defined for a Page Type Placeholder.
        /// </summary>
        /// <param name="pageTypeId">Page Type to query</param>
        /// <param name="placeholderId">Placeholder to query</param>
        /// <returns>List of container class names</returns>
        public static IEnumerable<string> GetPageTypeContainerClasses(Guid pageTypeId, string placeholderId)
        {
            using (DataConnection connection = new DataConnection())
            {
                var containerClasses = connection.Get<IPageTypeDefaultPageContent>().Where(f => f.PageTypeId == pageTypeId && f.PlaceHolderId == placeholderId).Select(f => f.ContainerClasses).FirstOrDefault();

                return ParseToList(containerClasses);
            }
        }

        /// <summary>
        /// Given a string containing zero or more class names seperated by space/and or commas, this function returned a list of trimmed class names.
        /// </summary>
        /// <param name="containerClasses">String with one or more class names</param>
        /// <returns>strings, one for each class </returns>
        public static IEnumerable<string> ParseToList(string containerClasses)
        {
            if (!string.IsNullOrEmpty(containerClasses))
            {
                var classList = containerClasses.Replace(" ", ",").Split(',').Where(s => !string.IsNullOrWhiteSpace(s));
                foreach (string containerClass in classList)
                {
                    yield return containerClass;
                }
            }

            yield break;
        }

        /// <summary>
        /// Ensure that a user provided string with 0 or more container class names is on the format "class1,class2,class3"
        /// </summary>
        /// <param name="containerClasses">User provided string</param>
        /// <returns>Structurally dependant string - each class seperated with a comma</returns>
        public static string NormalizeClassNamesString(string containerClasses)
        {
            return string.Join(",", ParseToList(containerClasses));
        }

        /// <summary>
        /// Merge two IList based class lists into one.
        /// </summary>
        /// <param name="originalClassList">Original list of classes. Some classes may be dropped from this list, if updated list has anantonyms</param>
        /// <param name="updatedClassList">Extra classes to add. These classes will have precedence.</param>
        /// <returns></returns>
        public static IList<string> MergeContainerClasses(IEnumerable<string> originalClassList, IEnumerable<string> updatedClassList)
        {
            return updatedClassList.Union(originalClassList ?? Enumerable.Empty<string>(), new EqualOrAntonymComparer()).ToList();
        }

        /// <summary>
        /// Merge two IList based class lists into one.
        /// </summary>
        /// <param name="originalClassList">Original list of classes. Some classes may be dropped from this list, if updated list has anantonyms</param>
        /// <param name="updatedClassList">Extra classes to add. These classes will have precedence.</param>
        /// <returns></returns>
        public static string MergeContainerClasses(string originalClassList, string updatedClassList)
        {
            return string.Join(",", MergeContainerClasses(ParseToList(originalClassList),ParseToList(updatedClassList)));
        }
    }
}
