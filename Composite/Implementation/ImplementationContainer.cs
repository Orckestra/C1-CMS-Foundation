using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Implementation
{
    // Other name?
    public static class ImplementationContainer
    {
        public static void SetImplementation<T>(T implementation) where T : ImplementationBase
        {
        }


        public static T GetImplementation<T>() where T : ImplementationBase
        {
            throw new NotImplementedException();
        }


        public static void ResetImplementation<T>(T implementation) where T : ImplementationBase
        {
        }
    }
}
