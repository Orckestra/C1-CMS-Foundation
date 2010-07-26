using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;


namespace Composite.Trees.Foundation.FolderRanges
{
    internal abstract class BaseFolderRanges : IFolderRanges
    {
        private List<IFolderRange> _folderRanges = new List<IFolderRange>();



        public void AddFolderRange(IFolderRange folderRange)
        {
            _folderRanges.Add(folderRange);
        }



        public abstract Expression CreateContainsListSelectBodyExpression(Expression fieldExpression, ParameterExpression parameterExpression);


        public abstract Expression CreateFilterExpression(int folderRangeIndex, Expression fieldExpression);



        public IEnumerable<IFolderRange> Ranges
        {
            get
            {
                foreach (IFolderRange folderRange in _folderRanges)
                {
                    yield return folderRange;
                }
            }
        }



        protected IFolderRange GetFolderRange(int index)
        {
            return _folderRanges.Where(f => f.Index == index).Single();
        }
    }
}
