using Composite.Data;



namespace Composite.Core.Implementation
{
    public class DataEventsImplementation<TData>
        where TData : class, IData
    {
        public virtual event DataEventHandler OnBeforeAdd 
        { 
            add 
            {
                DataEventSystemFacade.SubscribeToDataBeforeAdd<TData>(value, true);
            } 
            remove 
            {
                DataEventSystemFacade.UnsubscribeToDataBeforeAdd(typeof(TData), value);
            } 
        }        



        public virtual event DataEventHandler OnAfterAdd
        {
            add
            {
                DataEventSystemFacade.SubscribeToDataAfterAdd<TData>(value, true);
            }
            remove
            {
                DataEventSystemFacade.UnsubscribeToDataAfterAdd(typeof(TData), value);
            }
        }



        public virtual event DataEventHandler OnBeforeUpdate
        {
            add
            {
                DataEventSystemFacade.SubscribeToDataBeforeUpdate<TData>(value, true);
            }
            remove
            {
                DataEventSystemFacade.UnsubscribeToDataBeforeUpdate(typeof(TData), value);
            }
        }



        public virtual event DataEventHandler OnAfterUpdate
        {
            add
            {
                DataEventSystemFacade.SubscribeToDataAfterUpdate<TData>(value, true);
            }
            remove
            {
                DataEventSystemFacade.UnsubscribeToDataAfterUpdate(typeof(TData), value);
            }
        }



        public virtual event DataEventHandler OnDeleted
        {
            add
            {
                DataEventSystemFacade.SubscribeToDataDeleted<TData>(value, true);
            }
            remove
            {
                DataEventSystemFacade.UnsubscribeToDataDeleted(typeof(TData), value);
            }
        }



        public virtual event DataEventHandler OnNew
        {
            add
            {
                DataEventSystemFacade.SubscribeToDataAfterBuildNew<TData>(value);
            }
            remove
            {
                DataEventSystemFacade.UnsubscribeToDataAfterBuildNew(typeof(TData), value);
            }
        }
    }    
}
