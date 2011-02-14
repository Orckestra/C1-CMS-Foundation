

namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public interface ISqlDataContext
	{
        /// <exclude />
        void Add(object entity, string tableName);

        /// <exclude />
        void Remove(object entity, string tableName);
	}
}
