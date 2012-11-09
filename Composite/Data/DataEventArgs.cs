using System;
using Composite.Core.Extensions;


namespace Composite.Data
{
    /// <summary>
    /// This class contains information for data events. See also <see cref="Composite.Data.StoreEventsArgs"/>.
    /// </summary>
    public class DataEventArgs : EventArgs
    {
        private readonly Type _dataType;
        private readonly IData _data;



        /// <summary>        
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="data"></param>
        /// <exclude />
        internal DataEventArgs(Type dataType, IData data)
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
        ///    IData myData = dataEventArgs.Data; // This will be the myDataType instance just created
        /// }
        /// </code>
        /// </example>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1721:PropertyNamesShouldNotMatchGetMethods", Justification = "We had to be backwards compatible")]
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
        /// void DataEvents_OnBeforeAdd(DataEventArgs dataEventArgs)
        /// {        
        ///    IMyDataType myDataType = dataEventArgs.GetData&lt;IMyDataType&gt;(); // This will be the myDataType instance just created
        /// }
        /// </code>
        /// </example>
        /// <typeparam name="TData">An IData interface</typeparam>
        /// <returns>Returns a casted version of the data item that is the suvject of the event fired.</returns>
        public TData GetData<TData>()
            where TData : IData
        {
            if (_dataType.IsAssignableFrom(typeof(TData)) == false)
            {
                throw new ArgumentException("TData is of wrong type ('{0}'). Data type is '{1}'".FormatWith(typeof(TData), _dataType));
            }

            return (TData)_data;
        }
    }
}
