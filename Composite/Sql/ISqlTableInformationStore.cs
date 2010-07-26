namespace Composite.Sql
{
	internal interface ISqlTableInformationStore
	{
        ISqlTableInformation GetTableInformation(string connectinoString, string tableName);
        void OnFlush();
	}
}
