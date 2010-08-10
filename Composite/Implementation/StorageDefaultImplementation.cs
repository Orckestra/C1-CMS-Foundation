using System.Collections.Generic;
using System.Globalization;
using Composite.Data;


namespace Composite.Implementation
{
    /// <summary>
    /// This is the  implementations of the Storage API.     
    /// See <see cref="Composite.Storage"/> for documentation of each method.
    /// </summary>
    public class StorageDefaultImplementation : StorageBase
    {    
        /// <summary>
        /// See <see cref="Composite.Storage.Open"/>
        /// </summary>
        /// <returns></returns>
        public override StorageAccess Open() 
        { 
            return new StorageAccessDefaultImplementation(PublicationScope.Public, null); 
        }



        /// <summary>
        /// See <see cref="Composite.Storage.Open"/>
        /// </summary>
        /// <returns></returns>
        public override StorageAccess Open(PublicationScope publicationScope) 
        { 
            return new StorageAccessDefaultImplementation(publicationScope, null); 
        }



        /// <summary>
        /// See <see cref="Composite.Storage.Open"/>
        /// </summary>
        /// <returns></returns>
        public override StorageAccess Open(PublicationScope publicationScope, CultureInfo locale) 
        { 
            return new StorageAccessDefaultImplementation(publicationScope, locale); 
        }



        /// <summary>
        /// See <see cref="Composite.Storage.Open"/>
        /// </summary>
        /// <returns></returns>
        public override StorageAccess Open(CultureInfo locale) 
        { 
            return new StorageAccessDefaultImplementation(PublicationScope.Public, locale); 
        }



        /// <summary>
        /// See <see cref="Composite.Storage.New"/>
        /// </summary>
        /// <returns></returns>
        public override T New<T>()
        {            
            return DataFacade.BuildNew<T>();
        }




        /// <summary>
        /// See <see cref="Composite.Storage.Locales"/>
        /// </summary>
        /// <returns></returns>
        public override IEnumerable<CultureInfo> Locales 
        { 
            get 
            {
                return DataLocalizationFacade.ActiveLocalizationCultures;
            } 
        }




        /// <summary>
        /// See <see cref="Composite.Storage.Events"/>
        /// </summary>
        /// <returns></returns>
        public override StorageEvents Events<T>()
        {
            return new StorageEventsDefaultImplementation<T>();
        }
    }
}
