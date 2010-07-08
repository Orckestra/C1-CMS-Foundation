using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Data;


namespace Composite.Implementation
{
    /// <summary>
    /// This is the base for implementations of the Storage API. 
    /// This is used for implementing mocks/stubs in tests
    /// Base is used because of name clashing
    /// </summary>
    public class StorageBase : ImplementationBase
    {
        public virtual StorageAccess Open() { return null; }
        public virtual StorageAccess Open(PublicationState publicationState) { return null; }
        public virtual StorageAccess Open(PublicationState publicationState, CultureInfo locale) { return null; }
        public virtual StorageAccess Open(CultureInfo locale) { return null; }

        public virtual T New<T>() where T : class, IFAKEData { return null; }

        public virtual IEnumerable<CultureInfo> Locales { get { yield break; } }

        public virtual StorageEvent Events<T>() where T : class, IFAKEData { return null; }
        public virtual StorageEvent Events(Type interfaceType) { return null; }
    }
}
