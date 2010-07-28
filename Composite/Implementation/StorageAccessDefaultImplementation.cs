using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Data;


namespace Composite.Implementation
{
    internal sealed class StorageAccessDefaultImplementation : StorageAccess
    {
        public StorageAccessDefaultImplementation(PublicationScope scope, CultureInfo locale)
            : base(scope, locale)
        {
            this.DataScopeIdentifier = DataScopeIdentifier.Administrated;

            if (scope == PublicationScope.Public)
            {
                this.DataScopeIdentifier = DataScopeIdentifier.Public;
            }
        }


        private DataScopeIdentifier DataScopeIdentifier { get; set; }


        public override IQueryable<T> Get<T>()
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.GetData<T>();
            }
        }



        public override T Add<T>(T item)
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.AddNew<T>(item);
            }
        }



        public override List<T> Add<T>(IEnumerable<T> items)
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                return DataFacade.AddNew<T>(items);
            }
        }



        public override void Update<T>(T item)
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Update(item);
            }
        }



        public override void Update<T>(IEnumerable<T> items)
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Update(items);
            }
        }



        public override void Delete<T>(T item)
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Delete<T>(item);
            }
        }



        public override void Delete<T>(IEnumerable<T> items)
        {
            using (new DataScope(this.DataScopeIdentifier, this.Locale))
            {
                DataFacade.Delete<T>(items);
            }
        }



        public override void Dispose()
        {
        }
    }
}
