using System.Collections;
using System.Collections.Generic;


namespace Composite.Collections.Generic
{
    public sealed class CastEnumerable<T> : IEnumerable<T>
    {
        IEnumerable _enumerable;

        public CastEnumerable(IEnumerable enumerable)
        {           
            _enumerable = enumerable;
        }


        IEnumerator<T> IEnumerable<T>.GetEnumerator()
        {
            return new CastEnumerator<T>(_enumerable.GetEnumerator());
        }


        IEnumerator IEnumerable.GetEnumerator()
        {
            return new CastEnumerator<T>(_enumerable.GetEnumerator());
        }
    }
}
