using System;
using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.Serialization;


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(GeneratedDataTypesElementProviderSecurityAncestorProvider))]
    public sealed class GeneratedDataTypesElementProviderTypeEntityToken : EntityToken
    {
        private string _id;
        private string _providerName;


        /// <exclude />
        public GeneratedDataTypesElementProviderTypeEntityToken(string serializedTypeName, string providerName, string id)
        {
            _id = id;
            _providerName = providerName;
            this.SerializedTypeName = serializedTypeName;
        }


        /// <exclude />
        public override string Type
        {
            get { return "GeneratedDataTypesElementProvider"; }
        }


        /// <exclude />
        public override string Source
        {
            get { return _providerName; }
            
        }


        /// <exclude />
        public override string Id
        {
            get { return _id; }
        }


        /// <exclude />
        public string SerializedTypeName
        {
            get;
            private set;
        }


        /// <exclude />
        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();

            DoSerialize(sb);

            StringConversionServices.SerializeKeyValuePair(sb, "_SerializedTypeName_", this.SerializedTypeName);

            return sb.ToString();
        }


        /// <exclude />
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


        /// <exclude />
        public override bool Equals(object obj)
        {
            EntityToken entityToken = obj as GeneratedDataTypesElementProviderTypeEntityToken;

            if (entityToken == null) return false;

            return Equals(entityToken);
        }


        /// <exclude />
        public bool Equals(GeneratedDataTypesElementProviderTypeEntityToken entityToken)
        {
            if (entityToken.GetHashCode() != GetHashCode()) return false;

            return entityToken.Type == this.Type &&
                   entityToken.Source == this.Source &&
                   entityToken.Id == this.Id &&
                   entityToken.SerializedTypeName == this.SerializedTypeName;
        }


        /// <exclude />
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
