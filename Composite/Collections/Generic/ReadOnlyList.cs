using System;
using System.Collections;
using System.Collections.Generic;


namespace Composite.Collections.Generic
{
    public sealed class ReadOnlyList<T> : IList<T>
    {
        private List<T> _list;

        public ReadOnlyList(List<T> list)
        {
            if (list == null) throw new ArgumentNullException("list");

            _list = list;
        }

        public int IndexOf(T item)
        {
            return _list.IndexOf(item);
        }

        public void Insert(int index, T item)
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyList");
        }

        public void RemoveAt(int index)
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyList");
        }

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

        public void Add(T item)
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyList");
        }

        public void Clear()
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyList");
        }

        public bool Contains(T item)
        {
            return _list.Contains(item);
        }

        public void CopyTo(T[] array, int arrayIndex)
        {
            _list.CopyTo(array, arrayIndex);
        }

        public int Count
        {
            get { return _list.Count; }
        }

        public bool IsReadOnly
        {
            get { return true; }
        }

        public bool Remove(T item)
        {
            throw new InvalidOperationException("This is not allowed on a ReadOnlyList");
        }

        public IEnumerator<T> GetEnumerator()
        {
            return _list.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return ((IEnumerable)_list).GetEnumerator();
        }
    }
}
