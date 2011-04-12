namespace Composite.Sql
{
	internal interface ISqlTableInformationStore
	{
        ISqlTableInformation GetTableInformation(string connectionString, string tableName);
        void OnFlush();
	}
}
