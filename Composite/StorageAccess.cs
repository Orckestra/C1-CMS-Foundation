using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Data;


namespace Composite
{
    /// <summary>
    /// This class provides access to the C1 storage.
    /// </summary>
    public abstract class StorageAccess : IDisposable
    {
        protected StorageAccess()
            : this(PublicationScope.Public, null)
        {
        }



        protected StorageAccess(PublicationScope scope, CultureInfo locale)
        {
            this.PublicationScope = scope;
            this.Locale = locale;
        }



        /// <summary>
        /// Returns an IQueryable of the given IData interface. 
        /// If no storage supports the given IData interface, an exception is thrown.
        /// </summary>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <returns>Returns an IQueryable of the given IData interface for further querying</returns>
        public virtual IQueryable<T> Get<T>() where T : class, IData { return null; }



        /// <summary>
        /// Adds the <typeparamref name="T"/> instance to the default C1 storage.
        /// If the storage does not exist, then one is created.
        /// This method triggers the events OnBeforeAdd and OnAfterAdd for the item <paramref name="item"/>
        /// </summary>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <param name="item">The data item to add</param>
        /// <returns>The newly added data item. Note: This could differ from the <paramref name="item"/></returns>
        public virtual T Add<T>(T item) where T : class, IData { return null; }



        /// <summary>
        /// Adds the <typeparamref name="T"/> instances to the default C1 storage.
        /// If the storage does not exist, then one is created.
        /// This method triggers the events OnBeforeAdd and OnAfterAdd for each item in <paramref name="items"/>
        /// </summary>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <param name="items">The data items to add</param>
        /// <returns>The newly added data items. Note: These could differ from the items in <paramref name="items"/></returns>
        public virtual List<T> Add<T>(IEnumerable<T> items) where T : class, IData { return null; }



        /// <summary>
        /// Updates the given <typeparamref name="T"/> instance in the C1 storage. 
        /// If any property values has been changed, these would be saved into the storage.
        /// This method triggers the events OnBeforeUpdate and OnAfterUpdate for the item <paramref name="item"/>
        /// </summary>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <param name="item">The item to update in the C1 storage</param>
        public virtual void Update<T>(T item) where T : class, IData { }



        /// <summary>
        /// Updates the geven <typeparamref name="T"/> instances in the C1 storage.
        /// If any property values in any of the <typeparamref name="T"/> instances, these would be saved into the storage.
        /// This method triggers the events OnBeforeUpdate and OnAfterUpdate for each item in <paramref name="items"/>
        /// </summary>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <param name="items">The items to update in the C1 storage</param>
        public virtual void Update<T>(IEnumerable<T> items) where T : class, IData { }



        /// <summary>
        /// Deletes the given <typeparamref name="T"/> instance permently from the C1 storage.        
        /// This method triggers the event OnDeleted for the item <paramref name="item"/>
        /// </summary>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <param name="item">The item to delete</param>
        public virtual void Delete<T>(T item) where T : class, IData { }



        /// <summary>
        /// Deletes the given <typeparamref name="T"/> instances permently from the C1 storage.
        /// This method triggers the event OnDeleted for each item in <paramref name="items"/>
        /// </summary>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <param name="items">The items to delete</param>
        public virtual void Delete<T>(IEnumerable<T> items) where T : class, IData { }



        /// <summary>
        /// The current publication state
        /// </summary>
        public virtual PublicationScope PublicationScope { get; private set; }



        /// <summary>
        /// The current locale. See <see cref="Storage"/> and <seealso cref="PublicationScope"/>
        /// </summary>
        public virtual CultureInfo Locale { get; private set; }



        /// <summary>
        /// Implement this if needed when created a mock/stup of this class
        /// </summary>
        public abstract void Dispose();
    }
}
