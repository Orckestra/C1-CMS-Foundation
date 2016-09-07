using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using Composite.Core.Serialization;


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
    /// EntityToken is used through out Composite C1 to describe artifacts that can have security settings. Also see <see cref="Composite.Data.DataEntityToken"/>.
    /// </summary>
    /// <remarks>
    /// When subclassing this class and adding properties that have an impack when identity (equiallity)
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
        public virtual bool IsValid() { return true; }


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
            StringBuilder sb = new StringBuilder();

            DoSerialize(sb);

            return sb.ToString();
        }



        /// <exclude />
        protected static void DoDeserialize(string serializedEntityToken, out string type, out string source, out string id)
        {
            Dictionary<string, string> dic;

            DoDeserialize(serializedEntityToken, out type, out source, out id, out dic);
        }



        /// <exclude />
        protected static void DoDeserialize(string serializedEntityToken, out string type, out string source, out string id, out Dictionary<string, string> dic)
        {
            dic = StringConversionServices.ParseKeyValueCollection(serializedEntityToken);

            if ((dic.ContainsKey("_EntityToken_Type_") == false) ||
                (dic.ContainsKey("_EntityToken_Source_") == false) ||
                (dic.ContainsKey("_EntityToken_Id_") == false))
            {
                throw new ArgumentException("The serializedEntityToken is not a serialized entity token", "serializedEntityToken");
            }

            type = StringConversionServices.DeserializeValueString(dic["_EntityToken_Type_"]);
            source = StringConversionServices.DeserializeValueString(dic["_EntityToken_Source_"]);
            id = StringConversionServices.DeserializeValueString(dic["_EntityToken_Id_"]);
        }



        /// <exclude />
        protected int HashCode { get; set; }



        /// <exclude />
        public virtual string GetPrettyHtml(Dictionary<string, string> piggybag)
        {
            EntityTokenHtmlPrettyfier entityTokenHtmlPrettyfier = new EntityTokenHtmlPrettyfier(this, piggybag);

            OnGetPrettyHtml(entityTokenHtmlPrettyfier);

            return entityTokenHtmlPrettyfier.GetResult();
        }



        /// <exclude />
        public virtual string OnGetTypePrettyHtml() { return this.Type; }

        /// <exclude />
        public virtual string OnGetSourcePrettyHtml() { return this.Source; }

        /// <exclude />
        public virtual string OnGetIdPrettyHtml() { return this.Id; }

        /// <exclude />
        public virtual string OnGetExtraPrettyHtml() { return null; }


        /// <exclude />
        public virtual void OnGetPrettyHtml(EntityTokenHtmlPrettyfier entityTokenHtmlPrettyfier) { }



        /// <exclude />
        public override bool Equals(object obj)
        {
            EntityToken entityToken = obj as EntityToken;

            if (entityToken == null) return false;

            if (entityToken.GetVersionHashCode() != GetVersionHashCode()) return false;

            return entityToken.VersionId == this.VersionId && EqualsWithVersionIgnore(entityToken);
        }

        /// <exclude />
        public bool EqualsWithVersionIgnore(object obj)
        {
            EntityToken entityToken = obj as EntityToken;

            if (entityToken == null) return false;


            ValidateEntityToken();

            if (entityToken.GetHashCode() != GetHashCode()) return false;

            return entityToken.Id == this.Id &&
                   entityToken.Type == this.Type &&
                   entityToken.Source == this.Source &&
                   entityToken.GetType() == this.GetType();
        }

        /// <exclude />
        public virtual string VersionId { get;  } = "";


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
            return string.Format("Source = {0}, Type = {1}, Id = {2}", this.Source, this.Type, this.Id);
        }



        private void ValidateEntityToken()
        {
            if (_entityTokenUniquenessValidated) return;

            _entityTokenUniquenessValidated = true;

            if ((string.IsNullOrEmpty(this.Type)) &&
                (string.IsNullOrEmpty(this.Source)) &&
                (string.IsNullOrEmpty(this.Id)))
            {
                ThrowNotUniqueException();
            }
        }

        private void ThrowNotUniqueException()
        {
            throw new InvalidOperationException(string.Format("EntityTokens should be unique for the given element. The properties Type, Source and Id may not all be empty string. This is not the case for this type {0}", GetType()));
        }
    }
}
