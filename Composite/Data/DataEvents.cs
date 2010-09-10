using Composite.Core.Implementation;


namespace Composite.Data
{
    /// <summary>
    /// This class contains all the event fired by C1 when changes are made 
    /// to data items. 
    /// </summary>
    /// <typeparam name="TData">Data type to attach events to</typeparam>
    public static class DataEvents<TData>
        where TData : class, IData
    {
        /// <summary>
        /// This event is fired just before a data item is added to the C1 store.
        /// See <see cref="Composite.Data.DataConnection.Add"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;().OnBeforeAdd += new DataEventHandler(DataEvents_OnBeforeAdd);
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
        /// This event is fired just after a data item has been added to the C1 store.
        /// See <see cref="Composite.Data.DataConnection.Add"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;().OnAfterAdd += new DataEventHandler(DataEvents_OnAfterAdd);
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
        /// This event is fired just before a data item is updated in the C1 store.
        /// See <see cref="Composite.Data.DataConnection.Update"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;().OnBeforeUpdate += new DataEventHandler(DataEvents_OnBeforeUpdate);
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
        /// This event is fired just after a data item has been added in the C1 store.
        /// See <see cref="Composite.Data.DataConnection.Update"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;().OnAfterUpdate += new DataEventHandler(DataEvents_OnAfterUpdate);
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
        /// This event is fired just before a data item is deleted from the C1 store.
        /// See <see cref="Composite.Data.DataConnection.Delete"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;().OnDeleted+= new DataEventHandler(DataEvents_OnDeleted);
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
        /// This event is fired just after a new data item is create. 
        /// See <see cref="Composite.Data.DataConnection.New"/>
        /// </summary>
        /// <example>
        /// <code>
        /// void MyMethod()
        /// {
        ///    DataEvents&lt;IMyDataType&gt;().OnNew += new DataEventHandler(DataEvents_OnNew);
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
    }
}
