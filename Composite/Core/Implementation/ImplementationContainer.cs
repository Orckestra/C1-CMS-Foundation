using System;

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
        private T _implementation;
        private bool _disposed;
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

            (_implementation as IDisposable)?.Dispose();

            _implementation = null;
        }
    }
}
