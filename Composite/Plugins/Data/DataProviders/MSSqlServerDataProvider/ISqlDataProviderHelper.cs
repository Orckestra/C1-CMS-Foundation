using System.Linq;
using Composite.Data;
using Composite.Data.Plugins.DataProvider;
using Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public interface ISqlDataProviderHelper
    {
        /// <exclude />
        IData GetDataById(IQueryable queryable, IDataId dataId, DataProviderContext dataProviderContext);

        /// <exclude />
        IData AddData(ISqlDataContext dataContext, IData dataToAdd, DataProviderContext dataProviderContext);

        /// <exclude />
        void RemoveData(ISqlDataContext dataContext, IData dataToRemove);
    }
}
