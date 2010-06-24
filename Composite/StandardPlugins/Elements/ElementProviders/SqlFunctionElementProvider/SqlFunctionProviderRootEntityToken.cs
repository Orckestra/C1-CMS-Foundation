using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Composite.Security;
using Composite.Data;
using Composite.Types;
using Composite.Serialization;

namespace Composite.StandardPlugins.Elements.ElementProviders.SqlFunctionElementProvider
{
    [SecurityAncestorProvider(typeof(SqlFunctionProviderEntityTokenSecurityAncestorProvider))]
    public sealed class SqlFunctionProviderRootEntityToken : EntityToken
    {
        private string _id;
        private string _source;

        internal SqlFunctionProviderRootEntityToken(string id, string source)
        {
            _id = id;
            _source = source;
        }


        public override string Type
        {
            get { return ""; }
        }


        public override string Source
        {
            get { return _source; }
        }


        public override string Id
        {
            get { return _id; }
        }


        public override string Serialize()
        {
            return DoSerialize();
        }


        public static EntityToken Deserialize(string serializedData)
        {
            string type, source, id;

            EntityToken.DoDeserialize(serializedData, out type, out source, out id);

            return new SqlFunctionProviderRootEntityToken(id, source);
        }
    }
}
