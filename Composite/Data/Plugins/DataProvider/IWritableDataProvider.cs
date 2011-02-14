using System.Collections.Generic;


namespace Composite.Data.Plugins.DataProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IWritableDataProvider : IDataProvider
    {
        /// <exclude />
        void Update(IEnumerable<IData> datas);

        /// <exclude />
        List<T> AddNew<T>(IEnumerable<T> datas) where T : class, IData;

        /// <exclude />
        void Delete(IEnumerable<DataSourceId> dataSourceIds);
    }
}
