using System;
using Composite.Collections.Generic;


namespace Composite.Implementation
{
#warning RELEASE: Missing documentation
    public static class ImplementationContainer
    {
        private static readonly Hashtable<Type, ImplementationBase> _implementations = new Hashtable<Type, ImplementationBase>();



        public static void SetImplementation<T>(T implementation) where T : ImplementationBase
        {
            lock(_implementations)
            {
                _implementations[typeof (T)] = implementation;
            }
        }



        public static T GetImplementation<T>() where T : ImplementationBase
        {
            return _implementations[typeof (T)] as T;
        }



        public static void ResetImplementation<T>(T implementation) where T : ImplementationBase
        {
            lock (_implementations)
            {
                _implementations[typeof(T)] = null;
            }
        }
    }
}
