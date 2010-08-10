using System;
using Composite.Data;


namespace Composite
{
#warning RELEASE: Missing documentation
    /// <summary>
    /// 
    /// </summary>
    /// <param name="dataEventArgs"></param>
    public delegate void StorageEventHandler(StorageEventArgs dataEventArgs);




#warning RELEASE: Missing documentation
    /// <summary>    
    /// </summary>
    public class StorageEventArgs : EventArgs
    {
        private readonly Type _dataType;
        private readonly IData _data;

        internal StorageEventArgs(Type dataType, IData data)
        {
            _dataType = dataType;
            _data = data;
        }


        public IData Data
        {
            get { return _data; }
        }


        public Type DataType
        {
            get { return _dataType; }
        }


        public T GetData<T>()
            where T : IData
        {
            if (_dataType.IsAssignableFrom(typeof(T)) == false) throw new ArgumentException(string.Format("T is of wrong type ('{0}'). Data type is '{1}'", typeof(T), _dataType));

            return (T)_data;
        }
    }


    

    /// <summary>
    /// This class contains all the event fired by C1 when changes are made 
    /// in the storage. To obtain a instance of the class see <see cref="Composite.Storage"/>
    /// </summary>
    public class StorageEvents
    {
        protected StorageEvents()
        {            
        }



        /// <summary>
        /// This event is fired just before a data item is added to the C1 store.
        /// See <see cref="Composite.StorageAccess.Add"/>
        /// </summary>
        public virtual event StorageEventHandler OnBeforeAdd { add { } remove { } }



        /// <summary>
        /// This event is fired just after a data item has been added to the C1 store.
        /// See <see cref="Composite.StorageAccess.Add"/>
        /// </summary>
        public virtual event StorageEventHandler OnAfterAdd { add { } remove { } }



        /// <summary>
        /// This event is fired just before a data item is updated in the C1 store.
        /// See <see cref="Composite.StorageAccess.Update"/>
        /// </summary>
        public virtual event StorageEventHandler OnBeforeUpdate { add { } remove { } }



        /// <summary>
        /// This event is fired just after a data item has been added in the C1 store.
        /// See <see cref="Composite.StorageAccess.Update"/>
        /// </summary>
        public virtual event StorageEventHandler OnAfterUpdate { add { } remove { } }




        /// <summary>
        /// This event is fired just before a data item is deleted from the C1 store.
        /// See <see cref="Composite.StorageAccess.Delete"/>
        /// </summary>
        public virtual event StorageEventHandler OnDeleted { add { } remove { } }



        /// <summary>
        /// This event is fired just after a new data item is create. 
        /// See <see cref="Composite.Storage.New"/>
        /// </summary>
        public virtual event StorageEventHandler OnNew { add { } remove { } }
    }
}
