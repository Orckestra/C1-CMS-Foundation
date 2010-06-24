using System.Data.SqlClient;
using Composite.Threading;

namespace Composite.Sql
{
	public static class SqlConnectionManager
	{
        public static SqlConnection GetConnection(string connectionString)
        {
            string threadDataKey = "SqlDataContext" + connectionString + "_SqlConnection";

            var threadData = ThreadDataManager.GetCurrentNotNull();

            SqlConnection connection;
            if (threadData.HasValue(threadDataKey))
            {
                connection = threadData[threadDataKey] as SqlConnection;
            }
            else
            {
                connection = new SqlConnection(connectionString);
                threadData.SetValue(threadDataKey, connection);
                connection.Open();
                threadData.OnDispose += connection.Close;
            }
            return connection;
        }
	}
}
