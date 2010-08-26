using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using System.Xml.Linq;
using Composite.Core.Caching;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Extensions;
using Composite.Functions;
using Composite.Functions.ManagedParameters;
using Composite.C1Console.Security;
using Composite.C1Console.Security.Cryptography;
using Composite.Sql;
using Composite.Core.Types;


namespace Composite.Plugins.Functions.FunctionProviders.SqlFunctionProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class SqlFunction : IFunction
    {
        ISqlFunctionInfo _functionInfo;
        IEnumerable<ParameterProfile> _parameterProfiles;
        private object _lock = new object();


        public SqlFunction(ISqlFunctionInfo functionInfo, IEnumerable<ParameterProfile> parameterProfiles)
            : this(functionInfo)
        {
            _parameterProfiles = parameterProfiles;
        }



        public SqlFunction(ISqlFunctionInfo functionInfo)
        {
            _functionInfo = functionInfo;
            Updated = true;
        }


        private bool Updated
        {
            get
            {
                return RequestLifetimeCache.HasKey(this);
            }
            set
            {
                Verify.IsTrue(value, "Only 'true' value can be assigned to this property.");
                RequestLifetimeCache.Add(this, true);
            }
        }

        public object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            EnsureUpdated();

            Dictionary<string, object> sqlParameters = new Dictionary<string, object>();

            foreach (ParameterProfile profile in ParameterProfiles)
            {
                object value = parameters.GetParameter(profile.Name);
                sqlParameters.Add(profile.Name, value);
            }

            ISqlConnection sqlConnection = GetConnection();

            string connectionString = sqlConnection.EncryptedConnectionString.Decrypt();
            Verify.That(!connectionString.IsNullOrEmpty(), "Connection string is empty");

            string result = null;
            if (sqlConnection.IsMsSql)
            {
                result = RunSequel(connectionString, sqlParameters);
            }
            else
            {
                result = RunOleDbSequel(connectionString, sqlParameters);
            }

            return BuidlXElement(result);
        }



        public string Name
        {
            get
            {
                return _functionInfo.Name;
            }
        }



        public string Namespace
        {
            get
            {
                return _functionInfo.Namespace;
            }
        }


        public string Description { get { return _functionInfo.Description; } }


        public Type ReturnType
        {
            get
            {
                return typeof(XElement);
            }
        }



        public IEnumerable<ParameterProfile> ParameterProfiles
        {
            get
            {
                lock (_lock)
                {
                    if (_parameterProfiles == null)
                    {
                        _parameterProfiles = ManagedParameterManager.GetParameterProfiles(_functionInfo.Id);
                    }
                }
                return _parameterProfiles;
            }
        }



        private ISqlConnection GetConnection()
        {
            Guid connectionId = _functionInfo.ConnectionId;
            var connection = (from item in DataFacade.GetData<ISqlConnection>()
                              where item.Id == connectionId
                              select item).FirstOrDefault();
            if (connection == null)
            {
                throw new ArgumentException("Could not find connection information for query", "queryId");
            }
            return connection;
        }



        private static XElement BuidlXElement(string item)
        {
            string result = "<root>" + item + "</root>";
            StringReader reader = new StringReader(result);
            return XElement.Load(reader);
        }



        private ISqlFunctionInfo GetQuery(Guid xmlQueryId)
        {
            var sqlQuery = (from item in DataFacade.GetData<ISqlFunctionInfo>()
                            where item.Id == xmlQueryId
                            select item).FirstOrDefault();
            return sqlQuery;
        }



        private class ConvertedQuery
        {
            public string Query { get; set; }
            public IDictionary<string, object> Parameters { get; set; }
        }



        private static ConvertedQuery ConvertToMSSqlSyntax(ISqlFunctionInfo queryInfo, IDictionary<string, object> parameterNames)
        {
            ConvertedQuery convertedQuery = new ConvertedQuery();

            StringBuilder builder = new StringBuilder();
            foreach (string name in parameterNames.Keys)
            {
                builder.Append(name);
                builder.Append("|");
            }
            builder.Remove(builder.Length - 1, 1);
            string regExp = builder.ToString();

            MatchCollection collection = new Regex(regExp).Matches(queryInfo.Command);

            IDictionary<string, object> oleDbParams = new Dictionary<string, object>();
            int i = 1;
            foreach (Match match in collection)
            {
                oleDbParams.Add("@sp" + i, parameterNames[match.Value.Trim()]);
                i++;
            }

            convertedQuery.Parameters = oleDbParams;
            convertedQuery.Query = queryInfo.Command;

            foreach (string name in parameterNames.Keys)
            {
                convertedQuery.Query = convertedQuery.Query.Replace(name, "?");
            }

            return convertedQuery;
        }



        private static bool ShouldConvert(ISqlFunctionInfo info, IDictionary<string, object> parameters)
        {
            if (info.IsStoredProcedure)
            {
                return false;
            }
            if (parameters.Count == 0)
            {
                return false;
            }
            return true;
        }



        private string RunOleDbSequel(string connectionString, IDictionary<string, object> parameters)
        {
            string query = _functionInfo.Command;
            IDictionary<string, object> queryParameters = parameters;

            if (ShouldConvert(_functionInfo, parameters))
            {
                ConvertedQuery convertedQuery = ConvertToMSSqlSyntax(_functionInfo, parameters);
                query = convertedQuery.Query;
                queryParameters = convertedQuery.Parameters;
            }


            DataSet dataSet = null;
            string result = string.Empty;
            using (OleDbConnection connection = new OleDbConnection(connectionString))
            {
                using (OleDbCommand command = new OleDbCommand(query, connection))
                {
                    if (_functionInfo.IsStoredProcedure)
                    {
                        command.CommandType = CommandType.StoredProcedure;
                    }
                    else
                    {
                        command.CommandType = CommandType.Text;
                    }
                    foreach (KeyValuePair<string, object> parm in queryParameters)
                    {
                        command.Parameters.Add(new OleDbParameter(parm.Key, parm.Value));
                    }

                    connection.Open();
                    if (_functionInfo.IsQuery)
                    {
                        dataSet = new DataSet();
                        using (OleDbDataAdapter adapter = new OleDbDataAdapter())
                        {
                            adapter.SelectCommand = command;
                            adapter.Fill(dataSet);
                            if (dataSet != null && !dataSet.HasChanges())
                            {
                                StringWriter writer = new StringWriter();
                                dataSet.WriteXml(writer);
                                result = writer.ToString();
                            }
                        }
                    }
                    else
                    {
                        command.ExecuteNonQuery();
                    }
                }
            }           
            return result;
        }



        private string RunSequel(string connectionString, IDictionary<string, object> parameters)
        {
            XmlReader reader = null;
            DataSet dataSet = null;
            string result = string.Empty;

            var connection = SqlConnectionManager.GetConnection(connectionString);

            using (SqlCommand command = new SqlCommand(_functionInfo.Command, connection))
            {
                if (_functionInfo.IsStoredProcedure)
                {
                    command.CommandType = CommandType.StoredProcedure;
                }
                else
                {
                    command.CommandType = CommandType.Text;
                }

                foreach (KeyValuePair<string, object> parm in parameters)
                {
                    command.Parameters.Add(new SqlParameter(parm.Key, parm.Value));
                }

                if (_functionInfo.IsQuery)
                {
                    if (_functionInfo.ReturnsXml)
                    {
                        reader = command.ExecuteXmlReader();
                        StringBuilder builder = new StringBuilder();
                        reader.Read();
                        while (!reader.EOF)
                        {
                            builder.Append(reader.ReadOuterXml());
                        }

                        result = builder.ToString();
                    }
                    else
                    {
                        dataSet = new DataSet();
                        using (SqlDataAdapter adapter = new SqlDataAdapter())
                        {
                            adapter.SelectCommand = command;
                            adapter.Fill(dataSet);
                            if (dataSet != null && !dataSet.HasChanges())
                            {
                                StringWriter writer = new StringWriter();
                                dataSet.WriteXml(writer);
                                result = writer.ToString();
                            }
                        }
                    }
                }
                else
                {
                    command.ExecuteNonQuery();
                }
            }

            return result;
        }

        private void EnsureUpdated()
        {
            if (Updated) return;

            ISqlFunctionInfo oldValue = _functionInfo;

            _functionInfo = (ISqlFunctionInfo) DataFacade.GetDataFromDataSourceId(_functionInfo.DataSourceId, true);

            Verify.That(_functionInfo != null, "Failed to get function '{0}'", oldValue.Name);

            Updated = true;
        }

        public EntityToken EntityToken
        {
            get 
            {
                return _functionInfo.GetDataEntityToken();
            }
        }
    }
}
