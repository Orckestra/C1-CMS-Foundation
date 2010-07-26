using Composite.EventSystem;
using System;


namespace Composite.Serialization
{
    internal static class SerializerHandlerFacade
    {
        private static ISerializerHandlerFacade _implementation = new SerializerHandlerFacadeImpl();

        internal static ISerializerHandlerFacade Implementation { get { return _implementation; } set { _implementation = value; } }



        static SerializerHandlerFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        // Overload
        public static string Serialize(object objectToSerialize)
        {
            string serializedObject;
            string errorMessage;
            if (TrySerialize(objectToSerialize, out serializedObject, out errorMessage) == false)
            {
                throw new InvalidOperationException(errorMessage);
            }

            return serializedObject;
        }


        public static bool TrySerialize(object objectToSerialize, out string serializedObject)
        {
            string errorMessage;
            return TrySerialize(objectToSerialize, out serializedObject, out errorMessage);
        }



        public static bool TrySerialize(object objectToSerialize, out string serializedObject, out string errorMessage)
        {
            return _implementation.TrySerialize(objectToSerialize, out serializedObject, out errorMessage);
        }



        public static object Deserialize(string serializedObject)
        {
            return _implementation.Deserialize(serializedObject);
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _implementation.OnFlush();
        }
    }
}
