using System;
using System.Collections.Generic;

namespace Composite.Parallelization
{
    [Obsolete("To be removed.")]
    public class IndexEnumerator: IEnumerable<int>
    {
        private readonly int _elementsCount;

        public IndexEnumerator(int elementsCount)
        {
            _elementsCount = elementsCount;
        }

        public IEnumerator<int> GetEnumerator()
        {
            for(int i = 0; i < _elementsCount; i++)
            {
                yield return i;
            }
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            for (int i = 0; i < _elementsCount; i++)
            {
                yield return i;
            }
        }

        public int Count
        {
            get { return _elementsCount; }
        }
    }
}
