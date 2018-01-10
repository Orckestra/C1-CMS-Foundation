using System.Collections;
using System.Collections.Generic;

namespace Composite.Core.Collections.Generic
{
    internal sealed class CastEnumerator<T> : IEnumerator<T>
    {
        IEnumerator _enumerator;

        public CastEnumerator(IEnumerator enumerator)
        {            
            _enumerator = enumerator;
        }

        public T Current
        {
            get
            {
                return (T)_enumerator.Current;
            }
        }

        public void Dispose()
        {
            _enumerator = null;
#if LeakCheck
            System.GC.SuppressFinalize(this);
#endif
        }

#if LeakCheck
        private string stack = System.Environment.StackTrace;
        /// <exclude />
        ~CastEnumerator()
        {
            Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
        }
#endif
        object IEnumerator.Current
        {
            get
            {
                return _enumerator.Current;
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
    }
}
