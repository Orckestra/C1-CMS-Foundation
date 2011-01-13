using System.Linq;
using System.Data.Linq;

using Composite.Data.Plugins.DataProvider;
using Composite.Data;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration.Foundation
{
    internal interface ISqlDataProviderHelperMethods
    {
        IData GetDataById(IQueryable queryable, IDataId dataId, DataProviderContext dataProviderContext);
        IData AddData(ISqlDataContext dataContext, IData dataToAdd, DataProviderContext dataProviderContext);
        void RemoveData(ISqlDataContext dataContext, IData dataToRemove);
    }
}
