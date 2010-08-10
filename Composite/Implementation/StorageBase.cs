using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Data;


namespace Composite.Implementation
{
    /// <summary>
    /// This is the base for implementations of the Storage API. 
    /// This is used for implementing mocks/stubs in tests
    /// See <see cref="Composite.Storage"/> for documentation of each method.
    /// </summary>
    public class StorageBase : ImplementationBase
    {
        public virtual StorageAccess Open() { return null; }
        public virtual StorageAccess Open(PublicationScope publicationScope) { return null; }
        public virtual StorageAccess Open(PublicationScope publicationScope, CultureInfo locale) { return null; }
        public virtual StorageAccess Open(CultureInfo locale) { return null; }

        public virtual T New<T>() where T : class, IData { return null; }

        public virtual IEnumerable<CultureInfo> Locales { get { yield break; } }

        public virtual StorageEvents Events<T>() where T : class, IData { return null; }
        public virtual StorageEvents Events(Type interfaceType) { return null; }
    }
}
