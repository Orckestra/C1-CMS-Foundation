using System;
using System.Collections.Generic;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Core.Serialization;
using Newtonsoft.Json;


namespace Composite.Plugins.Elements.ElementProviders.GeneratedDataTypesElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(GeneratedDataTypesElementProviderSecurityAncestorProvider))]
    public sealed class GeneratedDataTypesElementProviderTypeEntityToken : EntityToken
    {
        private readonly string _providerName;


        /// <exclude />
        [JsonConstructor]
        public GeneratedDataTypesElementProviderTypeEntityToken(string serializedTypeName, string source, string id)
        {
            Id = id;
            _providerName = source;
            this.SerializedTypeName = serializedTypeName;
        }

        
        /// <exclude />
        public override string Type => "GeneratedDataTypesElementProvider";


        /// <exclude />
        public override string Source => _providerName;


        /// <exclude />
        public override string Id { get; }


        /// <exclude />
        public string SerializedTypeName
        {
            get;
            private set;
        }


        /// <exclude />
        public override string Serialize()
        {
            return CompositeJsonSerializer.Serialize(this);
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            EntityToken entityToken;
            if (CompositeJsonSerializer.IsJsonSerialized(serializedEntityToken))
            {
                entityToken = CompositeJsonSerializer
                    .Deserialize<GeneratedDataTypesElementProviderTypeEntityToken>(serializedEntityToken);
            }
            else
            {
                entityToken = DeserializeLegacy(serializedEntityToken);
                Log.LogVerbose(nameof(GeneratedDataTypesElementProviderTypeEntityToken), entityToken.GetType().FullName);
            }
            return entityToken;
        }

        /// <exclude />
        public static EntityToken DeserializeLegacy(string serializedEntityToken)
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
            return base.Equals(obj) &&
                   (obj as GeneratedDataTypesElementProviderTypeEntityToken).SerializedTypeName == this.SerializedTypeName;
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
