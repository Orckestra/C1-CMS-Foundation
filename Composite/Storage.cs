using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Data;
using Composite.Implementation;


namespace Composite
{
    public enum PublicationState
    {
        Public,
        Internal
    }



    /// <summary>
    /// This class provies the main access to the C1 storage. This could be based on SQL, XML or some other kind of storage.
    /// </summary>
    public static class Storage
    {

        static Storage()
        {
            ImplementationContainer.SetImplementation<StorageBase>(new StorageDefaultImplementation());
        }
        



        public static StorageAccess Open() 
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Open();
        }



        public static StorageAccess Open(PublicationState publicationState) 
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Open(publicationState);            
        }



        public static StorageAccess Open(PublicationState publicationState, CultureInfo locale) 
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Open(publicationState, locale);        
        }



        public static StorageAccess Open(CultureInfo locale) 
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Open(locale);
        }



        public static T New<T>() where T : class, IData 
        {
            return ImplementationContainer.GetImplementation<StorageBase>().New<T>();
        }



        public static IEnumerable<CultureInfo> Locales 
        { 
            get 
            {
                return ImplementationContainer.GetImplementation<StorageBase>().Locales;
            } 
        }



        public static StorageEvent Events<T>() where T : class, IData 
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Events<T>();
        }



        public static StorageEvent Events(Type interfaceType)
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Events(interfaceType);
        }
    }
}
