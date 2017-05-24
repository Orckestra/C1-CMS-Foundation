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
        /// <exclude />
        public ThreadDataManagerData Parent { get; set; }
        private Hashtable<object, object> Data { get; set; }
        private bool _disposed = false;


        /// <exclude />
        public ThreadDataManagerData()
            : this(null)
        {
        }

        internal delegate void OnThreadDataDisposedDelegate();

        /// <exclude />
        public event ThreadStart OnDispose;

        /// <exclude />
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
            while (current != null && !current.Data.ContainsKey(key))
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


        /// <exclude />
        public void SetValue(object key, object value)
        {
            CheckNotDisposed();

            this.Data[key] = value;
        }

        /// <exclude />
        public object GetValue(object key)
        {
            CheckNotDisposed();

            return Data[key];
        }

        /// <exclude />
        public bool HasValue(object key)
        {
            CheckNotDisposed();

            return this.Data.ContainsKey(key);
        }

        /// <exclude />
        public object this[object key] => GetValue(key);

        /// <exclude />
        public void CheckNotDisposed()
        {
            if(_disposed) throw new ObjectDisposedException("TheadDataManagerData");
        }

        #region IDisposable Members


        /// <exclude />
        public void Dispose()
        {
            OnDispose?.Invoke();
            _disposed = true;

#if LeakCheck
            GC.SuppressFinalize(this);
#endif
        }

#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~ThreadDataManagerData()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
        }
#endif
        #endregion
    }
}
