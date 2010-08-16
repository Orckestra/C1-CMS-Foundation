using System;
using Composite.Collections.Generic;


namespace Composite.Implementation
{
    /// <summary>
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
    }
}
