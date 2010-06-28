using System;
using System.Collections.Generic;
using System.Text;
using Composite.Security;
using Composite.Serialization;


namespace Composite.StandardPlugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    [SecurityAncestorProvider(typeof(GeneratedDataTypesElementProviderSecurityAncestorProvider))]
    internal sealed class GeneratedDataTypesElementProviderTypeEntityToken : EntityToken
    {
        private string _id;
        private string _providerName;


        public GeneratedDataTypesElementProviderTypeEntityToken(string serializedTypeName, string providerName, string id)
        {
            _id = id;
            _providerName = providerName;
            this.SerializedTypeName = serializedTypeName;
        }


        public override string Type
        {
            get { return "GeneratedDataTypesElementProvider"; }
        }


        public override string Source
        {
            get { return _providerName; }
            
        }


        public override string Id
        {
            get { return _id; }
        }


        public string SerializedTypeName
        {
            get;
            private set;
        }


        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();

            DoSerialize(sb);

            StringConversionServices.SerializeKeyValuePair(sb, "_SerializedTypeName_", this.SerializedTypeName);

            return sb.ToString();
        }


        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;
            Dictionary<string, string> dic;

            DoDeserialize(serializedEntityToken, out type, out source, out id, out dic);

            if (dic.ContainsKey("_SerializedTypeName_") == false) 
            {
                throw new ArgumentException("The serializedEntityToken is not a serialized entity token", "serializedEntityToken");
            }

            string serializedTypeName = StringConversionServices.DeserializeValueString(dic["_SerializedTypeName_"]);

            return new GeneratedDataTypesElementProviderTypeEntityToken(serializedTypeName, source, id);
        }


        public override bool Equals(object obj)
        {
            EntityToken entityToken = obj as GeneratedDataTypesElementProviderTypeEntityToken;

            if (entityToken == null) return false;

            return Equals(entityToken);
        }


        public bool Equals(GeneratedDataTypesElementProviderTypeEntityToken entityToken)
        {
            if (entityToken.GetHashCode() != GetHashCode()) return false;

            return entityToken.Type == this.Type &&
                   entityToken.Source == this.Source &&
                   entityToken.Id == this.Id &&
                   entityToken.SerializedTypeName == this.SerializedTypeName;
        }


        public override int GetHashCode()
        {
            if (this.HashCode == 0)
            {
                this.HashCode = GetType().GetHashCode() ^ this.Type.GetHashCode() ^ this.Source.GetHashCode() ^ this.Id.GetHashCode() ^ this.SerializedTypeName.GetHashCode();
            }
            return this.HashCode;
        }
    }
}
