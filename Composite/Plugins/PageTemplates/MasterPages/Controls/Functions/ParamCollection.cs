using System;
using System.Collections;

namespace Composite.Plugins.PageTemplates.MasterPages.Controls.Functions
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ParamCollection : IList, ICollection, IEnumerable
    {
        private readonly ArrayList _innerList = new ArrayList();

        /// <exclude />
        public void Add(Param value)
        {
            _innerList.Add(value);
        }

        /// <exclude />
        public void Clear()
        {
            _innerList.Clear();
        }

        /// <exclude />
        public bool Contains(Param value)
        {
            return _innerList.Contains(value);
        }

        /// <exclude />
        public int IndexOf(Param value)
        {
            return _innerList.IndexOf(value);
        }

        /// <exclude />
        public void Insert(int index, Param value)
        {
            _innerList.Insert(index, value);
        }

        /// <exclude />
        public bool IsFixedSize
        {
            get { return false; }
        }

        /// <exclude />
        public bool IsReadOnly
        {
            get { return false; }
        }

        /// <exclude />
        public void Remove(Param value)
        {
            _innerList.Remove(value);
        }

        /// <exclude />
        public void RemoveAt(int index)
        {
            _innerList.RemoveAt(index);
        }

        /// <exclude />
        public Param this[int index]
        {
            get { return (Param)_innerList[index]; }
            set { _innerList[index] = value; }
        }

        /// <exclude />
        public void CopyTo(Array array, int index)
        {
            _innerList.CopyTo(array, index);
        }

        /// <exclude />
        public int Count
        {
            get { return _innerList.Count; }
        }

        /// <exclude />
        public bool IsSynchronized
        {
            get { return _innerList.IsSynchronized; }
        }

        /// <exclude />
        public object SyncRoot
        {
            get { return this; }
        }

        /// <exclude />
        public IEnumerator GetEnumerator()
        {
            return _innerList.GetEnumerator();
        }

        int IList.Add(object value)
        {
            var param = (Param)value;

            return _innerList.Add(param);
        }

        bool IList.Contains(object value)
        {
            return this.Contains((Param)value);
        }

        int IList.IndexOf(object value)
        {
            return this.IndexOf((Param)value);
        }

        void IList.Insert(int index, object value)
        {
            this.Insert(index, (Param)value);
        }

        void IList.Remove(object value)
        {
            this.Remove((Param)value);
        }

        object IList.this[int index]
        {
            get { return this._innerList[index]; }
            set { this._innerList[index] = (Param)value; }
        }
    }
}
