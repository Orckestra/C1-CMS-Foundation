using System;
using System.Globalization;

using Composite.Data;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// Implementation pending
    /// </summary>
    /// <typeparam name="TData"></typeparam>
    public class DataEventsImplementation<TData>
        where TData : class, IData
    {
        /// <summary>
        /// Implementation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
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



        /// <summary>
        /// Implementation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
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



        /// <summary>
        /// Implementation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
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



        /// <summary>
        /// Implementation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
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



        /// <summary>
        /// Implementation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
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



        /// <summary>
        /// Implementation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
        public virtual event StoreEventHandler OnStoreChanged
        {
            add
            {
                DataEventSystemFacade.SubscribeToStoreChanged<TData>(value, true);
            }
            remove
            {
                DataEventSystemFacade.UnsubscribeToStoreChanged(typeof(TData), value);
            }
        }



        /// <summary>
        /// Implementation pending
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1009:DeclareEventHandlersCorrectly", Justification = "We had to be backwards compatible")]
        public virtual event DataEventHandler OnNew
        {
            add
            {
                DataEventSystemFacade.SubscribeToDataAfterBuildNew<TData>(value, true);
            }
            remove
            {
                DataEventSystemFacade.UnsubscribeToDataAfterBuildNew(typeof(TData), value);
            }
        }


        /// <summary>
        /// Implementation pending
        /// </summary>
        public virtual void FireExternalStoreChangeEvent(PublicationScope publicationScope, CultureInfo locale)
        {
            DataEventSystemFacade.FireExternalStoreChangedEvent(typeof(TData), publicationScope, locale);
        }
    }    
}
