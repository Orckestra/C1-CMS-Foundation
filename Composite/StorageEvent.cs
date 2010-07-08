using System;


namespace Composite
{
    // Base class for data events. 
    // This makes it possible to do mocking/stubbin
    public class StorageEvent
    {
        public virtual event EventHandler OnAdd { add { } remove { } }
        public virtual event EventHandler OnUpdate { add { } remove { } }
        public virtual event EventHandler OnDelete { add { } remove { } }
    }
}
