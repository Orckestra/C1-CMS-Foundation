using System.Data.SqlClient;
using Composite.Core.Threading;

namespace Composite.Core.Sql
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
