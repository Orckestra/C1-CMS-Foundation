using System.Collections.Generic;
using System.Linq.Expressions;


namespace Composite.Trees.Foundation.FolderRanges
{
    internal interface IFolderRanges
    {
        /// <summary>
        /// This is called by DataFolderElementsTreeNode when finding folders
        /// </summary>
        /// <param name="fieldExpression"></param>
        /// <returns>
        /// This should return an expression that gives a list of bools foreach folder range
        /// whether folder range is containing data or not.
        /// </returns>
        Expression CreateContainsListSelectBodyExpression(Expression fieldExpression, ParameterExpression parameterExpression);



        /// <summary>
        /// This is called by DataFolderElementsTreeNode when finding children to a folder element
        /// </summary>
        /// <returns>
        /// This should return an expression that filters so that only children of the given folder
        /// element is return.
        /// </returns>
        Expression CreateFilterExpression(int folderRangeIndex, Expression fieldExpression);



        IEnumerable<IFolderRange> Ranges { get; }
    }
}
