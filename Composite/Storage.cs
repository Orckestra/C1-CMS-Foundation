using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Data;
using Composite.Implementation;


namespace Composite
{
    public enum PublicationScope
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



        public static StorageAccess Open(PublicationScope publicationScope) 
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Open(publicationScope);            
        }



        public static StorageAccess Open(PublicationScope publicationScope, CultureInfo locale) 
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Open(publicationScope, locale);        
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



        public static StorageEvents Events<T>() where T : class, IData 
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Events<T>();
        }



        public static StorageEvents Events(Type interfaceType)
        {
            return ImplementationContainer.GetImplementation<StorageBase>().Events(interfaceType);
        }
    }
}
