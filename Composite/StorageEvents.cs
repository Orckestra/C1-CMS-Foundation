using System;
using Composite.Data;


namespace Composite
{
    /// <summary>
    /// The event handle type for several storage events. See <see cref="StorageEvents"/> and <see cref="Storage.Events"/>.
    /// </summary>
    /// <param name="dataEventArgs"></param>
    public delegate void StorageEventHandler(StorageEventArgs dataEventArgs);






    /// <summary>
    /// This class contains information for several storage events.
    /// </summary>
    public class StorageEventArgs : EventArgs
    {
        private readonly Type _dataType;
        private readonly IData _data;



        /// <summary>        
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="data"></param>
        /// <exclude />
        internal StorageEventArgs(Type dataType, IData data)
        {
            _dataType = dataType;
            _data = data;
        }



        /// <summary>
        /// This is the data item that is the subject of the event fired.
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    Storage.Events&lt;IMyDataType&gt;().OnBeforeAdd += new StorageEventHandler(Storage_OnBeforeAdd);
        ///    
        ///    using (var access = Storage.Open())
        ///    {
        ///       IMyDataType myDataType = Storage.New&lt;IMyDataType&gt;();
        ///       myDataType.Name = "Foo";
        ///       
        ///       access.Add&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void Storage_OnBeforeAdd(StorageEventArgs dataEventArgs)
        /// {        
        ///    IData myData = dataEventArgs.Data; // This will be the myDataType instance just created
        /// }
        /// </code>
        /// </example>
        public IData Data
        {
            get { return _data; }
        }



        /// <summary>
        /// This is the type of the data item that is the subject of the event fired.
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    Storage.Events&lt;IMyDataType&gt;().OnBeforeAdd += new StorageEventHandler(Storage_OnBeforeAdd);
        ///    
        ///    using (var access = Storage.Open())
        ///    {
        ///       IMyDataType myDataType = Storage.New&lt;IMyDataType&gt;();
        ///       myDataType.Name = "Foo";
        ///       
        ///       access.Add&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void Storage_OnBeforeAdd(StorageEventArgs dataEventArgs)
        /// {        
        ///    Type type = dataEventArgs.DataType; // This will be the type of myDataType instance. E.i. IMyDataType
        /// }
        /// </code>
        /// </example>
        public Type DataType
        {
            get { return _dataType; }
        }




        /// <summary>
        /// This is the data item that is the subject of the event fired.
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    Storage.Events&lt;IMyDataType&gt;().OnBeforeAdd += new StorageEventHandler(Storage_OnBeforeAdd);
        ///    
        ///    using (var access = Storage.Open())
        ///    {
        ///       IMyDataType myDataType = Storage.New&lt;IMyDataType&gt;();
        ///       myDataType.Name = "Foo";
        ///       
        ///       access.Add&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void Storage_OnBeforeAdd(StorageEventArgs dataEventArgs)
        /// {        
        ///    IMyDataType myDataType = dataEventArgs.GetData&lt;IMyDataType&gt;(); // This will be the myDataType instance just created
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="T">An IData interface</typeparam>
        /// <returns>Returns a casted version of the data item that is the suvject of the event fired.</returns>
        public T GetData<T>()
            where T : IData
        {
            if (_dataType.IsAssignableFrom(typeof(T)) == false) throw new ArgumentException(string.Format("T is of wrong type ('{0}'). Data type is '{1}'", typeof(T), _dataType));

            return (T)_data;
        }
    }




    

    /// <summary>
    /// This class contains all the event fired by C1 when changes are made 
    /// in the storage. To obtain a instance of the class see <see cref="Composite.Storage.Events"/>
    /// </summary>
    public class StorageEvents
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="StorageEvents"/> class
        /// </summary>
        protected StorageEvents()
        {            
        }



        /// <summary>
        /// This event is fired just before a data item is added to the C1 store.
        /// See <see cref="Composite.StorageAccess.Add"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    Storage.Events&lt;IMyDataType&gt;().OnBeforeAdd += new StorageEventHandler(Storage_OnBeforeAdd);
        ///    
        ///    using (var access = Storage.Open())
        ///    {
        ///       IMyDataType myDataType = Storage.New&lt;IMyDataType&gt;();
        ///       myDataType.Name = "Foo";
        ///       
        ///       access.Add&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void Storage_OnBeforeAdd(StorageEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        public virtual event StorageEventHandler OnBeforeAdd { add { } remove { } }



        /// <summary>
        /// This event is fired just after a data item has been added to the C1 store.
        /// See <see cref="Composite.StorageAccess.Add"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    Storage.Events&lt;IMyDataType&gt;().OnAfterAdd += new StorageEventHandler(Storage_OnAfterAdd);
        ///    
        ///    using (var access = Storage.Open())
        ///    {
        ///       IMyDataType myDataType = Storage.New&lt;IMyDataType&gt;();
        ///       myDataType.Name = "Foo";
        ///       
        ///       access.Add&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void Storage_OnAfterAdd(StorageEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        public virtual event StorageEventHandler OnAfterAdd { add { } remove { } }



        /// <summary>
        /// This event is fired just before a data item is updated in the C1 store.
        /// See <see cref="Composite.StorageAccess.Update"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    Storage.Events&lt;IMyDataType&gt;().OnBeforeUpdate += new StorageEventHandler(Storage_OnBeforeUpdate);
        ///    
        ///    using (var access = Storage.Open())
        ///    {
        ///       IMyDataType myDataType = 
        ///          (from item in Storage.Get&lt;IMyDataType&gt;()
        ///           where item.Id == 1
        ///           select item).First();
        ///           
        ///       myDataType.Name = "Foo";
        ///       
        ///       access.Update&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void Storage_OnBeforeUpdate(StorageEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        public virtual event StorageEventHandler OnBeforeUpdate { add { } remove { } }



        /// <summary>
        /// This event is fired just after a data item has been added in the C1 store.
        /// See <see cref="Composite.StorageAccess.Update"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    Storage.Events&lt;IMyDataType&gt;().OnAfterUpdate += new StorageEventHandler(Storage_OnAfterUpdate);
        ///    
        ///    using (var access = Storage.Open())
        ///    {
        ///       IMyDataType myDataType = 
        ///          (from item in Storage.Get&lt;IMyDataType&gt;()
        ///           where item.Id == 1
        ///           select item).First();
        ///           
        ///       myDataType.Name = "Foo";
        ///       
        ///       access.Update&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void Storage_OnAfterUpdate(StorageEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        public virtual event StorageEventHandler OnAfterUpdate { add { } remove { } }




        /// <summary>
        /// This event is fired just before a data item is deleted from the C1 store.
        /// See <see cref="Composite.StorageAccess.Delete"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    Storage.Events&lt;IMyDataType&gt;().OnDeleted+= new StorageEventHandler(Storage_OnDeleted);
        ///    
        ///    using (var access = Storage.Open())
        ///    {
        ///       IMyDataType myDataType = 
        ///          (from item in Storage.Get&lt;IMyDataType&gt;()
        ///           where item.Id == 1
        ///           select item).First();
        ///           
        ///       access.Delete&lt;IMyDataType&gt;(myDataType); // This will fire the event!
        ///    }
        /// }
        /// 
        /// 
        /// void Storage_OnDeleted(StorageEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        public virtual event StorageEventHandler OnDeleted { add { } remove { } }



        /// <summary>
        /// This event is fired just after a new data item is create. 
        /// See <see cref="Composite.Storage.New"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    Storage.Events&lt;IMyDataType&gt;().OnNew += new StorageEventHandler(Storage_OnNew);
        ///    
        ///    IMyDataType myDataType = Storage.New&lt;IMyDataType&gt;(); // This will fire the event!
        /// }
        /// 
        /// 
        /// void Storage_OnNew(StorageEventArgs dataEventArgs)
        /// {        
        /// }
        /// </code>
        /// </example>
        public virtual event StorageEventHandler OnNew { add { } remove { } }
    }
}
