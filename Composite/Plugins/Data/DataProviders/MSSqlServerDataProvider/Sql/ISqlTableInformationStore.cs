namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.Sql
{
	internal interface ISqlTableInformationStore
	{
        ISqlTableInformation GetTableInformation(string connectionString, string tableName);
        void ClearCache(string connectionString, string tableName);
        void OnFlush();
	}
}
