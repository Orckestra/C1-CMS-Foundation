using System;
using System.Collections;
using System.Collections.Generic;


namespace Composite.Core.Collections.Generic
{
#warning MRJ: GO KILL THIS CLASS!!!! And use the one in system
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ReadOnlyList<T> : IList<T>
    {
        private List<T> _list;


        /// <exclude />
        public ReadOnlyList(List<T> list)
        {
            if (list == null) throw new ArgumentNullException("list");

            _list = list;
        }


        /// <exclude />
        public int IndexOf(T item)
        {
            return _list.IndexOf(item);
        }


        /// <exclude />
        public void Insert(int index, T item)
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyList");
        }


        /// <exclude />
        public void RemoveAt(int index)
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyList");
        }


        /// <exclude />
        public T this[int index]
        {
            get
            {
                return _list[index];
            }
            set
            {
                throw new InvalidOperationException("This is not allowed on a ReadOnlyList");
            }
        }


        /// <exclude />
        public void Add(T item)
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyList");
        }


        /// <exclude />
        public void Clear()
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyList");
        }


        /// <exclude />
        public bool Contains(T item)
        {
            return _list.Contains(item);
        }


        /// <exclude />
        public void CopyTo(T[] array, int arrayIndex)
        {
            _list.CopyTo(array, arrayIndex);
        }


        /// <exclude />
        public int Count
        {
            get { return _list.Count; }
        }


        /// <exclude />
        public bool IsReadOnly
        {
            get { return true; }
        }


        /// <exclude />
        public bool Remove(T item)
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyList");
        }


        /// <exclude />
        public IEnumerator<T> GetEnumerator()
        {
            return _list.GetEnumerator();
        }


        /// <exclude />
        IEnumerator IEnumerable.GetEnumerator()
        {
            return ((IEnumerable)_list).GetEnumerator();
        }
    }
}
