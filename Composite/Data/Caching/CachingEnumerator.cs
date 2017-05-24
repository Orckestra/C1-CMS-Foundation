using System.Collections;
using System.Collections.Generic;
using System;
using Composite.Data.Foundation.CodeGeneration;


namespace Composite.Data.Caching
{
    internal sealed class CachingEnumerator<T> : IEnumerator<T>
    {
        private readonly IEnumerator<T> _enumerator;
        private Func<T, T> _wrapperConstructor;


        public CachingEnumerator(IEnumerator<T> enumerator)
        {
            _enumerator = enumerator;
        }


        public T Current => WrapperConstructor(_enumerator.Current);


        public void Dispose()
        {
            _enumerator.Dispose();
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
        }

#if LeakCheck
        private string stack = Environment.StackTrace;
        /// <exclude />
        ~CachingEnumerator()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
        }
#endif
            object IEnumerator.Current => WrapperConstructor(_enumerator.Current);


        public bool MoveNext()
        {
            return _enumerator.MoveNext();
        }


        public void Reset()
        {
            _enumerator.Reset();
        }


        private Func<T, T> WrapperConstructor
        {
            get
            {
                return _wrapperConstructor 
                    ?? (_wrapperConstructor = DataWrapperTypeManager.GetWrapperConstructor<T>());
            }
        }
    }
}
