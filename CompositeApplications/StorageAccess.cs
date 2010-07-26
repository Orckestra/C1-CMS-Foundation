using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Data;


namespace Composite
{
    // This is the base class for StorangeAccess, this type is returned by the Storage API.
    // Inherit this to do mocking/stubbing in tests
    // Base is not postfixed at this class because its used/referenced by the developer
    public abstract class StorageAccess : IDisposable
    {
        protected StorageAccess()
            : this(PublicationState.Public, null)
        {
        }



        protected StorageAccess(PublicationState scope, CultureInfo locale)
        {
            this.StorageAccessScope = scope;
            this.Locale = locale;
           /* this.RaiseEvents = true;
            this.ValidateForeignKeys = true;*/
        }

        public virtual IQueryable<T> Get<T>() where T : class, IData { return null; }

        public virtual void Add<T>(T item) where T : class, IData { }
        public virtual void Add<T>(IEnumerable<T> items) where T : class, IData { }

        public virtual void Update<T>(T item) where T : class, IData { }
        public virtual void Update<T>(IEnumerable<T> items) where T : class, IData { }

        public virtual void Delete<T>(T item) where T : class, IData { }
        public virtual void Delete<T>(IEnumerable<T> items) where T : class, IData { }               


        // These methods should not be in the API - to advanced
        /*
        // Is IQueryable<IFAKEData> possible else use IQueryable, not sure that the cast will work, but it might just :)
        public virtual IQueryable<IFAKEData> Get(Type interfaceType) { return null; }
        public virtual void Add(Type interfaceType, IFAKEData item) { }
        public virtual void Add(Type interfaceType, IEnumerable<IFAKEData> items) { }
        public virtual void Update(Type interfaceType, IFAKEData item) { }
        public virtual void Update(Type interfaceType, IEnumerable<IFAKEData> items) { }
        public virtual void Delete(Type interfaceType, IFAKEData item) { }
        public virtual void Delete(Type interfaceType, IEnumerable<IFAKEData> items) { }
        public virtual IFAKEData New(Type interfaceType) { return null; }
         */


        public abstract void Dispose();


        public virtual PublicationState StorageAccessScope { get; private set; }
        public virtual CultureInfo Locale { get; private set; }


        // These methods should not be in the API - to advanced
        /*
        public virtual bool RaiseEvents { get; set; } // Defaults is true
        public virtual bool ValidateForeignKeys { get; set; } // Defaults is true   
         */ 
    }
}
