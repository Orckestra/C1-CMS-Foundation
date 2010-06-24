using System;
using Composite.Data.Hierarchy.Foundation;


namespace Composite.Data.Hierarchy
{
    public static class DataAncestorFacade
    {
        public static IData GetParent(this IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            IDataAncestorProvider provider = DataAncestorProviderCache.GetDataAncestorProvider(data);

            return provider.GetParent(data);;
        }
    }
}
