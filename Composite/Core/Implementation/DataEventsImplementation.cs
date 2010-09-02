using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Data;


namespace Composite.Core.Implementation
{
    public class Abe
    {
        public void Kurt()
        {
            DataEvents.Events<IData>().OnBeforeAdd += new StorageEventHandler(Abe_OnBeforeAdd);
        }

        void Abe_OnBeforeAdd(StorageEventArgs dataEventArgs)
        {
            throw new NotImplementedException();
        }       
    }



    public class DataTypeEventsImplementation<TData>
        where TData : class, IData
    {
        public virtual event StorageEventHandler OnBeforeAdd 
        { 
            add 
            {
                DataEventSystemFacade.SubscribeToDataBeforeAdd<TData>(value);
            } 
            remove 
            {
                DataEventSystemFacade.UnsubscribeToDataBeforeAdd(typeof(TData), value);
            } 
        }
    }



    public class DataTypeEvents<TData> : ImplementationContainer<DataTypeEventsImplementation<TData>>        
        where TData : class, IData
        
    {
        public DataTypeEvents()
            : base(() => ImplementationFactory.CurrentFactory.CreateStatelessDataTypeEvents<TData>())
        {
        }



        public event StorageEventHandler OnBeforeAdd
        {
            add
            {
                this.Implementation.OnBeforeAdd += value;
            }
            remove
            {
                this.Implementation.OnBeforeAdd -= value;
            }
        }
    }



    public class DataEventsImplementation
    {
        public DataTypeEvents<TData> Events<TData>()
            where TData : class, IData
        {
            throw new NotImplementedException();
        }
    }



    public static class DataEvents
    {
        public static DataTypeEvents<TData> Events<TData>()
            where TData : class, IData
        {
            throw new NotImplementedException();
        }
    }
}
