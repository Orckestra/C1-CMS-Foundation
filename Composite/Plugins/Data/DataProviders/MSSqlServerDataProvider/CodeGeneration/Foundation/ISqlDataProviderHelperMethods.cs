using System.Linq;
using System.Data.Linq;

using Composite.Data.Plugins.DataProvider;
using Composite.Data;


namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public interface ISqlDataProviderHelperMethods
    {
        /// <exclude />
        IData GetDataById(IQueryable queryable, IDataId dataId, DataProviderContext dataProviderContext);

        /// <exclude />
        IData AddData(ISqlDataContext dataContext, IData dataToAdd, DataProviderContext dataProviderContext);

        /// <exclude />
        void RemoveData(ISqlDataContext dataContext, IData dataToRemove);
    }
}
