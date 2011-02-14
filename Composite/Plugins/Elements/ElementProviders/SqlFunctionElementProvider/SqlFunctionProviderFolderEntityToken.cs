using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.Serialization;


namespace Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(SqlFunctionProviderEntityTokenSecurityAncestorProvider))]
    public sealed class SqlFunctionProviderFolderEntityToken : EntityToken
	{
        private string _id;
        private string _source;
        private string _connectionId;

        internal SqlFunctionProviderFolderEntityToken(string id, string source, string connectionId)
        {
            _id = id;
            _source = source;
            _connectionId = connectionId;
        }



        /// <exclude />
        public override string Type
        {
            get { return ""; }
        }



        /// <exclude />
        public override string Source
        {
            get { return _source; }
        }



        /// <exclude />
        public override string Id
        {
            get { return _id; }
        }



        /// <exclude />
        public string ConnectionId
        {
            get { return _connectionId; }

        }


        /// <exclude />
        public override string Serialize()
        {
            StringBuilder builder = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair<string>(builder, "id", _id);
            StringConversionServices.SerializeKeyValuePair<string>(builder, "source", _source);
            StringConversionServices.SerializeKeyValuePair<string>(builder, "connectionId", _connectionId);

            return builder.ToString();
        }



        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            IDictionary<string, string> result = StringConversionServices.ParseKeyValueCollection(serializedData);

            string id = StringConversionServices.DeserializeValueString(result["id"]);
            string source = StringConversionServices.DeserializeValueString(result["source"]);
            string connectionId = StringConversionServices.DeserializeValueString(result["connectionId"]);

            return new SqlFunctionProviderFolderEntityToken(id, source, connectionId);
        }


        /// <exclude />
        public override bool Equals(object obj)
        {
            EntityToken entityToken = obj as SqlFunctionProviderFolderEntityToken;

            if (entityToken == null) return false;

            return Equals(entityToken);
        }


        /// <exclude />
        public bool Equals(SqlFunctionProviderFolderEntityToken entityToken)
        {
            if (entityToken.GetHashCode() != GetHashCode()) return false;

            return entityToken.Type == this.Type &&
                   entityToken.Source == this.Source &&
                   entityToken.Id == this.Id &&
                   entityToken.ConnectionId == this.ConnectionId;
        }


        /// <exclude />
        public override int GetHashCode()
        {
            if (this.HashCode == 0)
            {
                this.HashCode = GetType().GetHashCode() ^ this.Type.GetHashCode() ^ this.Source.GetHashCode() ^ this.Id.GetHashCode() ^ this.ConnectionId.GetHashCode();
            }
            return this.HashCode;
        }
	}
}
