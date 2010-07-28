using System;


namespace Composite
{
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
        public virtual event EventHandler OnBeforeAdd { add { } remove { } }



        /// <summary>
        /// This event is fired just after a data item has been added to the C1 store.
        /// See <see cref="Composite.StorageAccess.Add"/>
        /// </summary>
        public virtual event EventHandler OnAfterAdd { add { } remove { } }



        /// <summary>
        /// This event is fired just before a data item is updated in the C1 store.
        /// See <see cref="Composite.StorageAccess.Update"/>
        /// </summary>
        public virtual event EventHandler OnBeforeUpdate { add { } remove { } }



        /// <summary>
        /// This event is fired just after a data item has been added in the C1 store.
        /// See <see cref="Composite.StorageAccess.Update"/>
        /// </summary>
        public virtual event EventHandler OnAfterUpdate { add { } remove { } }




        public virtual event EventHandler OnDeleted { add { } remove { } }
    }
}
