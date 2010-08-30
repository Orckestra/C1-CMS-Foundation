using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.Linq;
using Composite.Data;


namespace Composite.Data
{   
    /// <summary>
    /// This class provides read/write access to the C1 storage.
    /// To obtain a instance of this class, see <see cref="Storage.Open"/>
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class StorageAccess : IDisposable
    {
        /// <summary>
        /// Initializes the instances with scope and locale.
        /// </summary>
        /// <param name="scope"><see cref="PublicationScope"/> to use in methods called on this instance</param>
        /// <param name="locale">Locale to use in methods called on this instance</param>        
        protected StorageAccess(PublicationScope scope, CultureInfo locale)
        {
            this.PublicationScope = scope;
            this.Locale = locale;
        }



        /// <summary>
        /// Returns an IQueryable of the given IData interface. 
        /// If no storage supports the given IData interface, an exception is thrown.
        /// </summary>
        /// <example>
        /// <code>
        /// using (StorageAccess access = Storage.Open())
        /// {
        ///    var q = 
        ///       from d in access.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <returns>Returns an IQueryable of the given IData interface for further querying</returns>
        [SuppressMessage("Microsoft.Naming", "CA1716:IdentifiersShouldNotMatchKeywords", MessageId = "Get", Justification = "We want to use this name because it short and saying")]
        public virtual IQueryable<T> Get<T>() where T : class, IData { return null; }



        /// <summary>
        /// Adds the <typeparamref name="T"/> instance to the default C1 storage.
        /// If the storage does not exist, then one is created.
        /// This method triggers the events OnBeforeAdd and OnAfterAdd for the item <paramref name="item"/>
        /// </summary>
        /// <example>
        /// <code>
        /// using (StorageAccess access = Storage.Open())
        /// {
        ///    IMyDataType myDataType = Storage.New&lt;IMyDataType&gt;();
        ///    myDataType.Name = "John Doe";
        ///    myDataType = access.Add&lt;IMyDataType&gt;(myDataType); 
        /// 
        ///    // Note that the reassigned of myDataType is important here
        ///    // if its used for an later update.
        /// 
        ///    myDataType.Name = "Jane Doe";
        ///    acess.Update&lt;IMyDataType&gt;(myDataType);
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <param name="item">The data item to add</param>
        /// <returns>The newly added data item. Note: This could differ from the <paramref name="item"/></returns>
        public virtual T Add<T>(T item) where T : class, IData { return null; }



        /// <summary>
        /// Adds the <typeparamref name="T"/> instances to the default C1 storage.
        /// If the storage does not exist, then one is created.
        /// This method triggers the events OnBeforeAdd and OnAfterAdd for each item in <paramref name="items"/>
        /// </summary>
        /// <example>
        /// <code>
        /// using (StorageAccess access = Storage.Open())
        /// {
        ///    List&lt;IMyDataType&gt; items = new List&lt;IMyDataType&gt;();
        ///    
        ///    for (int i = 0; i &lt; 10; i++)
        ///    {
        ///       IMyDataType myDataType = Storage.New&lt;IMyDataType&gt;();
        ///       myDataType.Name = "John Doe";
        ///       myDataType.Number = i;
        ///       items.Add(myDataType);
        ///    }   
        ///    
        ///    access.Add&lt;IMyDataType&gt;(items);
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <param name="items">The data items to add</param>
        /// <returns>The newly added data items. Note: These could differ from the items in <paramref name="items"/></returns>
        public virtual IList<T> Add<T>(IEnumerable<T> items) where T : class, IData { return null; }



        /// <summary>
        /// Updates the given <typeparamref name="T"/> instance in the C1 storage. 
        /// If any property values has been changed, these would be saved into the storage.
        /// This method triggers the events OnBeforeUpdate and OnAfterUpdate for the item <paramref name="item"/>
        /// </summary>
        /// <example>
        /// <code>
        /// using (StorageAccess access = Storage.Open())
        /// {
        ///    IMyDataType myDataType = 
        ///       (from d in access.Get&lt;IMyDataType&gt;()
        ///        where d.Name == "Foo"
        ///        select d).First();
        ///    
        ///    myDataType.Name = "Bar";
        ///    
        ///    acess.Update&lt;IMyDataType&gt;(myDataType);
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <param name="item">The item to update in the C1 storage</param>
        public virtual void Update<T>(T item) where T : class, IData { }



        /// <summary>
        /// Updates the geven <typeparamref name="T"/> instances in the C1 storage.
        /// If any property values in any of the <typeparamref name="T"/> instances, these would be saved into the storage.
        /// This method triggers the events OnBeforeUpdate and OnAfterUpdate for each item in <paramref name="items"/>
        /// </summary>
        /// <example>
        /// <code>
        /// using (StorageAccess access = Storage.Open())
        /// {
        ///    IEnumerable&lt;IMyDataType&gt; myDataTypes = 
        ///       from d in access.Get&lt;IMyDataType&gt;()
        ///       where d.Value > 10
        ///       select d;
        ///    
        ///    foreach (IMyDataType in myDataTypes)
        ///    {
        ///       myDataType.Value += 10;
        ///    }   
        ///    
        ///    acess.Update&lt;IMyDataType&gt;(myDataTypes);
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <param name="items">The items to update in the C1 storage</param>
        public virtual void Update<T>(IEnumerable<T> items) where T : class, IData { }



        /// <summary>
        /// Deletes the given <typeparamref name="T"/> instance permently from the C1 storage.        
        /// This method triggers the event OnDeleted for the item <paramref name="item"/>
        /// </summary>
        /// <example>
        /// <code>
        /// using (StorageAccess access = Storage.Open())
        /// {
        ///    IMyDataType myDataType = 
        ///       (from d in access.Get&lt;IMyDataType&gt;()
        ///        where d.Name == "Foo"
        ///        select d).First();
        ///    
        ///    
        ///    acess.Delete&lt;IMyDataType&gt;(myDataType);
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <param name="item">The item to delete</param>
        public virtual void Delete<T>(T item) where T : class, IData { }



        /// <summary>
        /// Deletes the given <typeparamref name="T"/> instances permently from the C1 storage.
        /// This method triggers the event OnDeleted for each item in <paramref name="items"/>
        /// </summary>
        /// <example>
        /// <code>
        /// using (StorageAccess access = Storage.Open())
        /// {
        ///    IMyDataType myDataTypes = 
        ///       from d in access.Get&lt;IMyDataType&gt;()
        ///       where d.Name == "Foo"
        ///       select d;
        ///    
        ///    
        ///    acess.Delete&lt;IMyDataType&gt;(myDataTypes);
        /// }
        /// </code>
        /// </example>
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
        /// Implement this created a mock/stup of this class
        /// </summary>
        [SuppressMessage("Microsoft.Design", "CA1063:ImplementIDisposableCorrectly", Justification = "We want to implement this in the non abstract implementations")]
        public abstract void Dispose();
    }
}
