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
        /// 
        /// </summary>
        /// <typeparam name="T">A <see cref="ImplementationBase"/> type. Could be: LogBase, NavigationBase, PageManagerBase, StorageBase</typeparam>
        /// <param name="implementation"></param>
        public static void SetImplementation<T>(T implementation) where T : ImplementationBase
        {
            lock(_implementations)
            {
                _implementations[typeof (T)] = implementation;
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T">A <see cref="ImplementationBase"/> type. Could be: LogBase, NavigationBase, PageManagerBase, StorageBase</typeparam>
        /// <returns></returns>
        public static T GetImplementation<T>() where T : ImplementationBase
        {
            return _implementations[typeof (T)] as T;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T">A <see cref="ImplementationBase"/> type. Could be: LogBase, NavigationBase, PageManagerBase, StorageBase</typeparam>
        /// <param name="implementation"></param>
        public static void ResetImplementation<T>(T implementation) where T : ImplementationBase
        {
            lock (_implementations)
            {
                _implementations[typeof(T)] = null;
            }
        }
    }
}
