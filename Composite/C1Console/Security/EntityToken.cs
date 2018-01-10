using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using Composite.Core.Serialization;
using Newtonsoft.Json;


namespace Composite.C1Console.Security
{
    internal class EntityTokenSerializerHandler : ISerializerHandler
    {
        public string Serialize(object objectToSerialize)
        {
            return EntityTokenSerializer.Serialize((EntityToken)objectToSerialize);
        }

        public object Deserialize(string serializedObject)
        {
            return EntityTokenSerializer.Deserialize(serializedObject);
        }
    }





    /// <summary>
    /// EntityToken is used through out C1 CMS to describe artifacts that can have security settings. Also see <see cref="Composite.Data.DataEntityToken"/>.
    /// </summary>
    /// <remarks>
    /// When subclassing this class and adding properties that have an impact when identity (equality)
    /// of the subclass, remember to overload Equal and GetHashCode!
    /// </remarks>
    [DebuggerDisplay("Type = {Type}, Source = {Source}, Id = {Id}")]
    [SerializerHandler(typeof(EntityTokenSerializerHandler))]
    public abstract class EntityToken
    {
        private bool _entityTokenUniquenessValidated;

        /// <summary>
        /// A string that forms one third of the unique key for the entity being represented. Being the 'type' part of the globally unique key 'type/source/id', 
        /// this value should be unique for your code and not clash with 'type' strings used in other code modules.
        /// </summary>
        public abstract string Type { get; }

        /// <summary>
        /// A string that forms one third of the unique key for the entity being represented. Being the 'source' part of the globally unique key 'type/source/id', 
        /// this value should be unique the source (like a file name or sql connection) when whence the entity come. This field is only important if enteties of 
        /// this type can come from different sources.
        /// </summary>
        public abstract string Source { get; }

        /// <summary>
        /// A string that forms one third of the unique key for the entity being represented. Being the 'id' part of the globally unique key 'type/source/id', 
        /// this value should identify a specific entity of the given 'type' from the given 'source'.
        /// </summary>
        public abstract string Id { get; }


        /// <summary>
        /// The state of the EntityToken. Invalid entity tokens will be automatically removed from the system.
        /// </summary>
        /// <returns>The state of the EntityToken.</returns>
        public virtual bool IsValid() => true;


        /// <summary>
        /// Serialize the EntityToken
        /// </summary>
        /// <returns>a string representation of the entity token</returns>
        public abstract string Serialize();

        /// <exclude />
        protected void DoSerialize(StringBuilder stringBuilder)
        {
            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_EntityToken_Type_", Type);
            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_EntityToken_Source_", Source);
            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_EntityToken_Id_", Id);
        }

        /// <exclude />
        protected string DoSerialize()
        {
            return CompositeJsonSerializer.Serialize(
                new Dictionary<string, string>() {{nameof(Type), Type},
                    { nameof(Source), Source}, {nameof(Id), Id}});
        }


        /// <exclude />
        protected static void DoDeserialize(string serializedEntityToken, out string type, out string source, out string id)
        {
            DoDeserialize(serializedEntityToken, out type, out source, out id, 
                          out Dictionary<string, string> _);
        }


        /// <exclude />
        protected static void DoDeserialize(string serializedEntityToken, out string type, out string source, out string id, out Dictionary<string, string> dictionary)
        {
            if (!CompositeJsonSerializer.IsJsonSerialized(serializedEntityToken))
            {
                DoDeserializeLegacy(serializedEntityToken, out type, out source, out id, out dictionary);
                return;
            }

            var properties = CompositeJsonSerializer.Deserialize<Dictionary<string, string>>(serializedEntityToken);

            if (!properties.TryGetValue(nameof(Type), out type)
                || !properties.TryGetValue(nameof(Source), out source)
                || !properties.TryGetValue(nameof(Id), out id))
            {
                throw new ArgumentException("Is not a serialized entity token", nameof(serializedEntityToken));
            }

            properties.Remove(nameof(Type));
            properties.Remove(nameof(Source));
            properties.Remove(nameof(Id));

            dictionary = properties;
        }


        /// <exclude />
        private static void DoDeserializeLegacy(string serializedEntityToken, out string type, out string source, out string id, out Dictionary<string, string> dic)
        {
            dic = StringConversionServices.ParseKeyValueCollection(serializedEntityToken);
            
            if (!dic.TryGetValue("_EntityToken_Type_", out string serializedType) ||
                !dic.TryGetValue("_EntityToken_Source_", out string serializedSource) ||
                !dic.TryGetValue("_EntityToken_Id_", out string serializedId))
            {
                throw new ArgumentException("Is not a serialized entity token", nameof(serializedEntityToken));
            }

            type = StringConversionServices.DeserializeValueString(serializedType);
            source = StringConversionServices.DeserializeValueString(serializedSource);
            id = StringConversionServices.DeserializeValueString(serializedId);
        }



        /// <exclude />
        protected int HashCode { get; set; }



        /// <exclude />
        public virtual string GetPrettyHtml(Dictionary<string, string> piggybag)
        {
            var entityTokenHtmlPrettyfier = new EntityTokenHtmlPrettyfier(this, piggybag);

            OnGetPrettyHtml(entityTokenHtmlPrettyfier);

            return entityTokenHtmlPrettyfier.GetResult();
        }



        /// <exclude />
        public virtual string OnGetTypePrettyHtml() => this.Type;

        /// <exclude />
        public virtual string OnGetSourcePrettyHtml() => this.Source;

        /// <exclude />
        public virtual string OnGetIdPrettyHtml() => this.Id;

        /// <exclude />
        public virtual string OnGetExtraPrettyHtml() => null;


        /// <exclude />
        public virtual void OnGetPrettyHtml(EntityTokenHtmlPrettyfier entityTokenHtmlPrettyfier) { }



        /// <exclude />
        public override bool Equals(object obj)
        {
            return obj is EntityToken entityToken
                   && entityToken.GetVersionHashCode() == GetVersionHashCode()
                   && entityToken.VersionId == this.VersionId 
                   && EqualsWithVersionIgnore(entityToken);
        }

        /// <exclude />
        public bool EqualsWithVersionIgnore(object obj)
        {
            var entityToken = obj as EntityToken;

            if (entityToken == null) return false;

            ValidateEntityToken();

            return entityToken.GetHashCode() == GetHashCode() &&
                   entityToken.Id == this.Id &&
                   entityToken.Type == this.Type &&
                   entityToken.Source == this.Source &&
                   entityToken.GetType() == this.GetType();
        }

        /// <exclude />
        [JsonIgnore]
        public virtual string VersionId { get; } = "";


        /// <exclude />
        public bool Equals(EntityToken entityToken)
        {
            return Equals(entityToken as object);
        }


        /// <exclude />
        public override int GetHashCode()
        {
            if (this.HashCode == 0)
            {
                ValidateEntityToken();
                this.HashCode = this.Type.GetHashCode() ^ this.Source.GetHashCode() ^ this.Id.GetHashCode();
            }

            return this.HashCode;
        }

        /// <exclude />
        public int GetVersionHashCode()
        {
            if (this.VersionHashCode == 0)
            {
                this.VersionHashCode = this.VersionId.GetHashCode();
            }

            return this.VersionHashCode;
        }

        /// <exclude />
        protected int VersionHashCode { get; set; }

        /// <exclude />
        public override string ToString()
        {
            return $"Source = {this.Source}, Type = {this.Type}, Id = {this.Id}";
        }



        private void ValidateEntityToken()
        {
            if (_entityTokenUniquenessValidated) return;

            _entityTokenUniquenessValidated = true;

            if (string.IsNullOrEmpty(this.Type) &&
                string.IsNullOrEmpty(this.Source) &&
                string.IsNullOrEmpty(this.Id))
            {
                ThrowNotUniqueException();
            }
        }

        private void ThrowNotUniqueException()
        {
            throw new InvalidOperationException($"EntityTokens should be unique for the given element. The properties Type, Source and Id may not all be empty string. This is not the case for this type {GetType()}");
        }
    }
}
