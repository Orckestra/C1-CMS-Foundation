using System;
using System.Collections.Generic;
using System.Globalization;
using Composite.Data;


namespace Composite.Implementation
{
    public class StorageDefaultImplementation : StorageBase
    {
        public override StorageAccess Open() 
        { 
            return new StorageAccessDefaultImplementation(PublicationScope.Public, null); 
        }



        public override StorageAccess Open(PublicationScope publicationScope) 
        { 
            return new StorageAccessDefaultImplementation(publicationScope, null); 
        }



        public override StorageAccess Open(PublicationScope publicationScope, CultureInfo locale) 
        { 
            return new StorageAccessDefaultImplementation(publicationScope, locale); 
        }



        public override StorageAccess Open(CultureInfo locale) 
        { 
            return new StorageAccessDefaultImplementation(PublicationScope.Public, locale); 
        }



        public override T New<T>()
        {
            return DataFacade.BuildNew<T>();
        }



        public override IEnumerable<CultureInfo> Locales 
        { 
            get 
            { 
                throw new NotImplementedException(); 
            } 
        }



        public override StorageEvents Events<T>()
        { 
            throw new NotImplementedException(); 
        }



        public override StorageEvents Events(Type interfaceType)
        {
            throw new NotImplementedException();
        }
    }
}
