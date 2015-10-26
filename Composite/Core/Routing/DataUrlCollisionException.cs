using System;

namespace Composite.Core.Routing
{
    internal class DataUrlCollisionException : Exception
    {
        public DataUrlCollisionException(Type dataType, RelativeRoute relativeRoute)
            : base($"There are multiple data items of type '{dataType}' matching the same relative route '{relativeRoute}'")
        {
            
        }
    }
}
