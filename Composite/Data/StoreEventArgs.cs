using System;
using System.Globalization;


namespace Composite.Data
{
    /// <summary>
    /// This class contains information for store change events. No specifics will be given as to which data item(s) were changed, 
    /// but the store (type, scope, language) is available. 
    /// 
    /// Property DataEventsFired indicate if detailed data events have already been fired for the data store change. In situations where data
    /// was changed in the physical store by another process, detailed events cannot be fired and you need to rely on the StoreChange event to do cache flushed etc.
    /// </summary>
    /// <example>
    /// <code>
    /// void MyMethod()
    /// {
    ///    DataEvents&lt;IMyDataType&gt;().OnStoreChange += new StoreEventHandler(DataEvents_StoreChanged);
    ///    
    ///    using (DataConnection connection = new DataConnection())
    ///    {
    ///       IMyDataType myDataType = DataConnection.New&lt;IMyDataType&gt;();
    ///       myDataType.Name = "Foo";
    ///       
    ///       connection.Add&lt;IMyDataType&gt;(myDataType); // This will fire the event - changes are made to the store!
    ///    }
    /// }
    /// 
    /// 
    /// void DataEvents_StoreChanged(object sender, StoreEventArgs storeEventArgs)
    /// {        
    ///    Type dataType = storeEventArgs.DataType; // This will be the type that changed
    ///    PublicationScope scope = storeEventArgs.PublicationScope; // The scope the event happened in - published vs. administrated
    ///    CultureInfo locale = storeEventArgs.Locale; // The culture (language) the event happened in
    ///    bool dataEventsFired = storeEventArgs.DataEventsFired; // True is detailed data item events have fired. False if a store reload happened and detailed events cannot be fired.
    /// }
    /// </code>
    /// </example>
    public class StoreEventArgs : EventArgs
    {
        private readonly Type _dataType;
        private readonly PublicationScope _publicationScope;
        private readonly CultureInfo _locale;
        private readonly bool _dataEventsFired;


        /// <summary>
        /// Initializes a new instance of the <see cref="StoreEventArgs"/> class.
        /// </summary>
        /// <param name="dataType">Type of the data.</param>
        /// <param name="publicationScope">The publication scope.</param>
        /// <param name="locale">The locale.</param>
        /// <param name="dataEventsFired">Value indicating whether detailed data events have been fired for this change event. 
        /// When <c>false</c> the change happened outside the current process 
        /// (in the physical store, perhaps done by another running instance). </param>
        /// <exclude/>
        internal StoreEventArgs(Type dataType, PublicationScope publicationScope, CultureInfo locale, bool dataEventsFired)
        {
            Verify.ArgumentNotNull(dataType, "dataType");
            Verify.ArgumentNotNull(publicationScope, "publicationScope");

            _dataType = dataType;
            _publicationScope = publicationScope;
            _locale = locale;
            _dataEventsFired = dataEventsFired;
        }



        /// <summary>
        /// Gets the data type that is the subject of the event fired.
        /// </summary>
        public Type DataType
        {
            get { return _dataType; }
        }


        /// <summary>
        /// Gets the data scope that is the subject of the event fired.
        /// </summary>
        public PublicationScope PublicationScope
        {
            get
            {
                return _publicationScope;
            }
        }


        /// <summary>
        /// Gets the locale that is the subject of the event fired.
        /// </summary>
        public CultureInfo Locale
        {
            get
            {
                return _locale;
            }
        }


        /// <summary>
        /// Gets a value indicating if detailed data events have been fired for this change event. When false the change happened outside the current process 
        /// (in the physical store, perhaps done by another running instance). You can rely on detailed data events to do precise cache management and use the StoreChange event
        /// when DataEventsFired is false to do a complete cache flush.
        /// </summary>
        public bool DataEventsFired
        {
            get
            {
                return _dataEventsFired;
            }
        }
    }
}
