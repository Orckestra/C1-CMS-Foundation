using System.Collections;
using System.Collections.Generic;
using System;
using Composite.Data.Foundation.CodeGeneration;


namespace Composite.Data.Caching
{
    public sealed class CachingEnumerator<T> : IEnumerator<T>
    {
        private IEnumerator<T> _enumerator;
        private Type _wrapperType;


        public CachingEnumerator(IEnumerator<T> enumerator)
        {
            _enumerator = enumerator;
        }


        public T Current
        {
            get
            {
                object wrapper = Activator.CreateInstance(this.WrapperType, new object[] { _enumerator.Current });

                return (T)wrapper;
            }
        }


        public void Dispose()
        {
            _enumerator.Dispose();
        }


        object IEnumerator.Current
        {
            get
            {
                object wrapper = Activator.CreateInstance(this.WrapperType, new object[] { _enumerator.Current });

                return wrapper;
            }
        }


        public bool MoveNext()
        {
            return _enumerator.MoveNext();
        }


        public void Reset()
        {
            _enumerator.Reset();
        }


        private Type WrapperType
        {
            get
            {
                if (_wrapperType == null)
                {
                    _wrapperType = DataWrapperGenerator.CreateType(typeof(T));
                }

                return _wrapperType;
            }
        }
    }
}
