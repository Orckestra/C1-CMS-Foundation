using Composite.Core.Implementation;
using System;
using System.Globalization;


namespace Composite.Data
{
    /// <summary>
    /// This class contains all the event fired by Orckestra CMS when changes are made to data items. 
    /// 
    /// Use <see cref="Composite.Data.DataEvents&lt;TData&gt;.OnStoreChanged"/> to catch any data change event, including events originating from other servers in a load balance setup
    /// or changes made directly to a store (which Orckestra CMS can detect). This event do not contain details about the specific data item changed and is raised after the fact.
    /// 
    /// Use the more detailed operations to catch data events that happen in the current website process. The 'OnBefore' events enable you to manipulate data before they are stored. 
    /// The 'OnAfter' events let you react to data changes in detail, for instance updating a cache.
    /// 
    /// A combination of <see cref="Composite.Data.DataEvents&lt;TData&gt;.OnStoreChanged"/> and the detailed data events can be used to create a highly optimized cache.
    /// </summary>
    /// <example>
    /// <code>
    /// void MyMethod()
    /// {
    ///    DataEvents&lt;IMyDataType&gt;.OnBeforeAdd += new DataEventHandler(DataEvents_OnBeforeAdd);
    ///    DataEvents&lt;IMyDataType&gt;.OnStoreChanged += new StoreEventHandler(DataEvents_OnStoreChanged);
    ///    
    ///    using (DataConnection connection = new DataConnection())
    ///    {
    ///       IMyDataType myDataType = DataConnection.New&lt;IMyDataType&gt;();
    ///       myDataType.Name = "Foo";
    ///       
    ///       connection.Add&lt;IMyDataType&gt;(myDataType); // This will fire both of the the events in the local process!
    ///       // if other servers share data store with this site they will see OnStoreChanged fire.
    ///    }
    /// }
    /// 
    /// 
    /// void DataEvents_OnBeforeAdd(object sender, DataEventArgs dataEventArgs)
    /// {        
    ///     // here a minor update to the cache could be done (like adding info about the new element only).
    /// }
    /// 
    /// 
    /// void DataEvents_OnStoreChanged(object sender, StoreEventArgs storeEventArgs)
    /// {        
    ///     if (!storeEventArgs.DataEventsFired)
    ///     {
    ///         // an external update event happened - DataEvents_OnBeforeAdd not fired
    ///         // here a complete cache flush could be done
    ///     }
    /// }
    /// </code>
    /// </example>
    /// <typeparam name="TData">Data type to attach events to</typeparam>
    public static class DataEvents<TData>
        where TData : class, IData
    {
        /// <summary>
        /// This event is fired just before a data item is added to the Orckestra CMS data store.
        /// See <see cref="Composite.Data.DataConnection.Add&lt;TData&gt;(TData)"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;.OnBeforeAdd += new DataEventHandler(DataEvents_OnBeforeAdd);
        ///    
        ///    using (DataConnection connection = new DataConnection())
        ///    {
        ///       IMyDataType myDataType = DataConnection.New&lt;IMyDataType&gt;();
        ///       myDataType.Name = "Foo";
        ///       
        ///       connection.Add&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void DataEvents_OnBeforeAdd(object sender, DataEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1000:DoNotDeclareStaticMembersOnGenericTypes", Justification = "We had to be backwards compatible")]
        public static event DataEventHandler OnBeforeAdd
        {
            add
            {                
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnBeforeAdd += value;
            }
            remove
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnBeforeAdd -= value;
            }
        }



        /// <summary>
        /// This event is fired just after a data item has been added to the Orckestra CMS data store.
        /// See <see cref="Composite.Data.DataConnection.Add&lt;TData&gt;(TData)"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;.OnAfterAdd += new DataEventHandler(DataEvents_OnAfterAdd);
        ///    
        ///    using (DataConnection connection = new DataConnection())
        ///    {
        ///       IMyDataType myDataType = DataConnection.New&lt;IMyDataType&gt;();
        ///       myDataType.Name = "Foo";
        ///       
        ///       connection.Add&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void DataEvents_OnAfterAdd(object sender, DataEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1000:DoNotDeclareStaticMembersOnGenericTypes", Justification = "We had to be backwards compatible")]
        public static event DataEventHandler OnAfterAdd
        {
            add
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnAfterAdd += value;
            }
            remove
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnAfterAdd -= value;
            }
        }



        /// <summary>
        /// This event is fired just before a data item is updated in the Orckestra CMS data store.
        /// See <see cref="Composite.Data.DataConnection.Update&lt;TData&gt;(TData)"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;.OnBeforeUpdate += new DataEventHandler(DataEvents_OnBeforeUpdate);
        ///    
        ///    using (DataConnection connection = new DataConnection())
        ///    {
        ///       IMyDataType myDataType = 
        ///          (from item in connection.get&lt;IMyDataType&gt;()
        ///           where item.Id == 1
        ///           select item).First();
        ///           
        ///       myDataType.Name = "Foo";
        ///       
        ///       connection.Update&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void DataEvents_OnBeforeUpdate(object sender, DataEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1000:DoNotDeclareStaticMembersOnGenericTypes", Justification = "We had to be backwards compatible")]
        public static event DataEventHandler OnBeforeUpdate
        {
            add
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnBeforeUpdate += value;
            }
            remove
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnBeforeUpdate -= value;
            }
        }



        /// <summary>
        /// This event is fired just after a data item has been updated in the Orckestra CMS data store.
        /// See <see cref="Composite.Data.DataConnection.Update&lt;TData&gt;(TData)"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;.OnAfterUpdate += new DataEventHandler(DataEvents_OnAfterUpdate);
        ///    
        ///    using (DataConnection connection = new DataConnection())
        ///    {
        ///       IMyDataType myDataType = 
        ///          (from item in connection.get&lt;IMyDataType&gt;()
        ///           where item.Id == 1
        ///           select item).First();
        ///           
        ///       myDataType.Name = "Foo";
        ///       
        ///       connection.Update&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void DataEvents_OnAfterUpdate(object sender, DataEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1000:DoNotDeclareStaticMembersOnGenericTypes", Justification = "We had to be backwards compatible")]
        public static event DataEventHandler OnAfterUpdate
        {
            add
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnAfterUpdate += value;
            }
            remove
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnAfterUpdate -= value;
            }
        }



        /// <summary>
        /// This event is fired after a data item has been deleted from the Orckestra CMS data store.
        /// See <see cref="Composite.Data.DataConnection.Delete&lt;TData&gt;(TData)"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;.OnDeleted+= new DataEventHandler(DataEvents_OnDeleted);
        ///    
        ///    using (DataConnection connection = new DataConnection())
        ///    {
        ///       IMyDataType myDataType = 
        ///          (from item in connection.get&lt;IMyDataType&gt;()
        ///           where item.Id == 1
        ///           select item).First();
        ///           
        ///       connection.Delete&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void DataEvents_OnDeleted(object sender, DataEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1000:DoNotDeclareStaticMembersOnGenericTypes", Justification = "We had to be backwards compatible")]
        public static event DataEventHandler OnDeleted
        {
            add
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnDeleted += value;
            }
            remove
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnDeleted -= value;
            }
        }



        /// <summary>
        /// This event is fired after changes has happened to the Orckestra CMS data store. This may be atomic actions or a larger change to the underlying
        /// data store. The <see cref="Composite.Data.StoreEventArgs"/> class describe the change in broad terms, including a flag indicating is detailed data
        /// event have been raised or not. 
        /// 
        /// You can use this event as a simple way to react to data changes (like clearing a cache) or you can mix this with atomic data events (add, delete, update)
        /// to make a build a more advanced cache.
        /// 
        /// You should listen to this event in order to support scale out across multiple servers, since this event is meant to be signaled when changes happen
        /// on another server. In such situations detailed data events will not fire on other machines.
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;.OnStoreChanged+= new StoreEventHandler(DataEvents_OnStoreChanged);
        ///    
        ///    using (DataConnection connection = new DataConnection())
        ///    {
        ///       IMyDataType myDataType = 
        ///          (from item in connection.get&lt;IMyDataType&gt;()
        ///           where item.Id == 1
        ///           select item).First();
        ///           
        ///       connection.Delete&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void DataEvents_OnStoreChanged(object sender, StoreEventArgs storeEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1000:DoNotDeclareStaticMembersOnGenericTypes", Justification = "We had to be backwards compatible")]
        public static event StoreEventHandler OnStoreChanged
        {
            add
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnStoreChanged += value;
            }
            remove
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnStoreChanged -= value;
            }
        }



        /// <summary>
        /// This event is fired just after a new data item is created.
        /// See <see cref="Composite.Data.DataConnection.New&lt;TData&gt;()"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;.OnNew += new DataEventHandler(DataEvents_OnNew);
        ///    
        ///    IMyDataType myDataType = DataConnection.New&lt;IMyDataType&gt;(); // This will fire the event!
        /// }
        /// 
        /// 
        /// void DataEvents_OnNew(object sender, DataEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1000:DoNotDeclareStaticMembersOnGenericTypes", Justification = "We had to be backwards compatible")]
        public static event DataEventHandler OnNew
        {
            add
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnNew += value;
            }
            remove
            {
                ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().OnNew -= value;
            }
        }



        /// <summary>
        /// Fire the event that signals that data in an external store has changed. 
        /// </summary>
        /// <remarks>
        /// You should NOT fire this event if you do data changes through the Orckestra CMS data API since events will already be handled for you in this case.
        /// 
        /// Use this method if you are responsible for flushing cached data originating from a store not fully managed by the local website process.
        /// 
        /// This could be data stored in a central database, where updates happened on another webserver and you wish to signal update events to other webservers running 
        /// in a farm. This could also be a situation where you have a custom data provider reading data from some 3rd party system or data store.
        /// 
        /// Calling this event will result in cache invalidation on all data of this particular type. 
        /// 
        /// Handlers listening to the <see cref="Composite.Data.DataEvents&lt;TData&gt;.OnStoreChanged"/> event will be called with a <see cref="Composite.Data.StoreEventArgs"/> 
        /// instance indicating that data events has not been fired. This signals that detail cache management is not possible and a complete cache flush is required on structures 
        /// depending on this data type.
        /// </remarks>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;.FireExternalStoreChangeEvent(PublicationScope.Published, new CultureInfo("da-DK"));
        /// }
        /// </code>
        /// </example>
        public static void FireExternalStoreChangeEvent(PublicationScope publicationScope, CultureInfo locale)
        {
            ImplementationFactory.CurrentFactory.CreateStatelessDataEvents<TData>().FireExternalStoreChangeEvent(publicationScope, locale);
        }
    }
}
