using System;
using Composite.Core.Collections.Generic;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class ImplementationContainer<T>
        where T : class
    {
        private T _implementation = null;
        private bool _disposed = false;
        private readonly Func<T> _create;



        internal ImplementationContainer(Func<T> create)
        {
            _create = create;
        }

        


        internal T Implementation
        {
            get
            {
                if (_implementation == null)
                {
                    CreateImplementation();
                }

                return _implementation;
            }
        }



        internal void CreateImplementation()
        {
            if (_disposed) throw new InvalidOperationException("Already disposed");

            _implementation = _create();
        }



        internal void DisposeImplementation()
        {
            _disposed = true;

            IDisposable disposable = _implementation as IDisposable;

            if (disposable != null)
            {
                disposable.Dispose();
            }

            _implementation = null;
        }
    }
}
