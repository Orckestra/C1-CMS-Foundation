using System;

namespace Composite.Implementation
{
    // Our implementation of StorageEvent
    public class StorageEventDefaultImplementation : StorageEvent
    {
        private EventHandler _onAddEvent;
        private EventHandler _onUpdateEvent;
        private EventHandler _onDeleteEvent;

    
        public override event EventHandler OnAdd
        {
            add
            {
                // This is were we can handle syncronizations
                _onAddEvent = (EventHandler)Delegate.Combine(_onAddEvent, value);
            }
            remove
            {
                // This is were we can handle syncronizations
                _onAddEvent = (EventHandler)Delegate.Remove(_onAddEvent, value);
            }
        }



        public override event EventHandler OnUpdate
        {
            add
            {
                // This is were we can handle syncronizations
                _onUpdateEvent = (EventHandler)Delegate.Combine(_onUpdateEvent, value);
            }
            remove
            {
                // This is were we can handle syncronizations
                _onUpdateEvent = (EventHandler)Delegate.Remove(_onUpdateEvent, value);
            }
        }



        public override event EventHandler OnDelete
        {
            add
            {
                // This is were we can handle syncronizations
                _onDeleteEvent = (EventHandler)Delegate.Combine(_onDeleteEvent, value);
            }
            remove
            {
                // This is were we can handle syncronizations
                _onDeleteEvent = (EventHandler)Delegate.Remove(_onDeleteEvent, value);
            }
        }
    }
}
