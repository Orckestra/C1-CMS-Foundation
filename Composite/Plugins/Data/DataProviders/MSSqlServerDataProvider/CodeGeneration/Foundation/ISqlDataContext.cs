

namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration.Foundation
{
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public interface ISqlDataContext
	{
        void Add(object entity, string tableName);
        void Remove(object entity, string tableName);
	}
}
