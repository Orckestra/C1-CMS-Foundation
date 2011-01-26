using System.Threading;
using Composite.Core.Collections.Generic;
using System;


namespace Composite.Core.Threading
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ThreadDataManagerData: IDisposable
    {
        public ThreadDataManagerData Parent { get; set; }
        private Hashtable<object, object> Data { get; set; }
        private bool _disposed = false;


        public ThreadDataManagerData()
            : this(null)
        {
        }

        internal delegate void OnThreadDataDisposedDelegate();

        public event ThreadStart OnDispose;

        public ThreadDataManagerData(ThreadDataManagerData parentThreadData)
        {
            this.Parent = parentThreadData;
            this.Data = new Hashtable<object, object>();
        }



        /// <summary>
        /// This method will find the first one that contains the key and return the value
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public bool TryGetParentValue(object key, out object value)
        {
            CheckNotDisposed();

            ThreadDataManagerData current = this;
            while ((current != null) && (current.Data.ContainsKey(key) == false))
            {
                current = current.Parent;
            }

            if (current == null)
            {
                value = null;
                return false;
            }

            value = current.Data[key];
            return true;
        }



        public void SetValue(object key, object value)
        {
            CheckNotDisposed();

            if (this.Data.ContainsKey(key) == false)
            {
                this.Data.Add(key, value);
            }
            else
            {
                this.Data[key] = value;
            }
        }

        public object GetValue(object key)
        {
            CheckNotDisposed();

            return Data[key];
        }

        public bool HasValue(object key)
        {
            CheckNotDisposed();

            return this.Data.ContainsKey(key);
        }

        public object this[object key]
        {
            get { return GetValue(key); }
        }

        public void CheckNotDisposed()
        {
            if(_disposed) throw new ObjectDisposedException("TheadDataManagerData");
        }

        #region IDisposable Members

        public void Dispose()
        {
            if (OnDispose != null)
            {
                OnDispose();
            }
            _disposed = true;
        }

        #endregion
    }
}
