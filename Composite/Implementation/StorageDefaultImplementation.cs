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
            return new StorageAccessDefaultImplementation(PublicationState.Public, null); 
        }



        public override StorageAccess Open(PublicationState publicationState) 
        { 
            return new StorageAccessDefaultImplementation(publicationState, null); 
        }



        public override StorageAccess Open(PublicationState publicationState, CultureInfo locale) 
        { 
            return new StorageAccessDefaultImplementation(publicationState, locale); 
        }



        public override StorageAccess Open(CultureInfo locale) 
        { 
            return new StorageAccessDefaultImplementation(PublicationState.Public, locale); 
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



        public override StorageEvent Events<T>()
        { 
            throw new NotImplementedException(); 
        }



        public override StorageEvent Events(Type interfaceType)
        {
            throw new NotImplementedException();
        }
    }
}
