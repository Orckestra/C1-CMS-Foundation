

namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration.Foundation
{
	internal interface ISqlDataContext
	{
        void Add(object entity, string tableName);
        void Remove(object entity, string tableName);
	}
}
