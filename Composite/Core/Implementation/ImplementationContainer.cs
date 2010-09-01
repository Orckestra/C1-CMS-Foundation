using System;
using Composite.Core.Collections.Generic;


namespace Composite.Core.Implementation
{
    public class ImplementationContainer<T>
        where T : class
    {
        private T _implementation = null;
        private bool _disposed = false;
        private Func<T> _create;



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
                    if (_disposed) throw new InvalidOperationException("Already disposed");

                    _implementation = _create();
                }

                return _implementation;
            }
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




#warning MRJ: Delete this stuff

   /* /// <summary>
    /// This static class provides mean for change the implementation of all static classes in the C1 API. 
    /// This can be used for mocking/stubbing when creating unittests or need to have control over 
    /// behaviour durring development.
    /// </summary>
    public static class ImplementationContainer
    {
        private static readonly Hashtable<Type, ImplementationBase> _implementations = new Hashtable<Type, ImplementationBase>();



        /// <summary>
        /// Use this method to replace the current implementation for the given <typeparamref name="T"/>.
        /// This could be used for mocking/stubbing.
        /// </summary>
        /// <typeparam name="T">A <see cref="ImplementationBase"/> type. Could be: LogBase, NavigationBase, PageManagerBase, StorageBase</typeparam>
        /// <param name="implementation">The new implementation for <typeparamref name="T"/></param>
        public static void SetImplementation<T>(T implementation)
            where T : ImplementationBase
        {
            lock (_implementations)
            {
                _implementations[typeof(T)] = implementation;
            }
        }
        


        /// <summary>
        /// This method returns the current implementation for the given <typeparamref name="T"/>.
        /// </summary>
        /// <typeparam name="T">A <see cref="ImplementationBase"/> type. Could be: LogBase, NavigationBase, PageManagerBase, StorageBase</typeparam>
        /// <returns>Returns the current implementation for for <typeparamref name="T"/></returns>
        public static T GetImplementation<T>()
            where T : ImplementationBase
        {
            return _implementations[typeof(T)] as T;
        }
    }*/
}
