using System.Globalization;


namespace Composite.Implementation
{
    // This will be our implementation of StorageAccess, mainly using the DataFacade
    public sealed class StorageAccessDefaultImplementation : StorageAccess
    {
        public StorageAccessDefaultImplementation(PublicationState scope, CultureInfo locale)
            : base(scope, locale)
        {
        }


        public override void Dispose()
        {
        }
    }
}
