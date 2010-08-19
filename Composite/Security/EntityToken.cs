using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using Composite.Serialization;


namespace Composite.Security
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
    /// When subclassing this class and adding properties that have an impack when identity (equiallity)
    /// of the subclass, remember to overload Equal and GetHashCode!
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [DebuggerDisplay("Type = {Type}, Source = {Source}, Id = {Id}")]
    [SerializerHandler(typeof(EntityTokenSerializerHandler))]
    public abstract class EntityToken
    {
        private bool _entityTokenUniquenessValidated;

        public abstract string Type { get; }
        public abstract string Source { get; }
        public abstract string Id { get; }


        public virtual bool IsValid() { return true; }


        public abstract string Serialize();



        protected void DoSerialize(StringBuilder stringBuilder)
        {
            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_EntityToken_Type_", Type);
            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_EntityToken_Source_", Source);
            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_EntityToken_Id_", Id);
        }



        protected string DoSerialize()
        {
            StringBuilder sb = new StringBuilder();

            DoSerialize(sb);

            return sb.ToString();
        }



        protected static void DoDeserialize(string serializedEntityToken, out string type, out string source, out string id)
        {
            Dictionary<string, string> dic;

            DoDeserialize(serializedEntityToken, out type, out source, out id, out dic);
        }


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



        protected int HashCode { get; set; }



        public virtual string GetPrettyHtml(Dictionary<string, string> piggybag)
        {
            EntityTokenHtmlPrettyfier entityTokenHtmlPrettyfier = new EntityTokenHtmlPrettyfier(this, piggybag);

            OnGetPrettyHtml(entityTokenHtmlPrettyfier);

            return entityTokenHtmlPrettyfier.GetResult();
        }



        public virtual string OnGetTypePrettyHtml() { return this.Type; }
        public virtual string OnGetSourcePrettyHtml() { return this.Source; }
        public virtual string OnGetIdPrettyHtml() { return this.Id; }
        public virtual string OnGetExtraPrettyHtml() { return null; }

        public virtual void OnGetPrettyHtml(EntityTokenHtmlPrettyfier entityTokenHtmlPrettyfier) { }



        public override bool Equals(object obj)
        {
            EntityToken entityToken = obj as EntityToken;

            if (entityToken == null) return false;

            return Equals(entityToken);
        }



        public bool Equals(EntityToken entityToken)
        {
            if (entityToken == null) return false;

            ValidateEntityToken();

            if (entityToken.GetHashCode() != GetHashCode()) return false; 

            return entityToken.Type == this.Type &&
                   entityToken.Source == this.Source &&
                   entityToken.Id == this.Id;
        }



        public override int GetHashCode()
        {
            if (this.HashCode == 0)
            {
                ValidateEntityToken();
                this.HashCode = this.Type.GetHashCode() ^ this.Source.GetHashCode() ^ this.Id.GetHashCode();
            }

            return this.HashCode;
        }



        public override string ToString()
        {
            return string.Format("Source = {0}, Type = {1}, Id = {2}", this.Source, this.Type, this.Id);
        }



        private void ValidateEntityToken()
        {
            if (_entityTokenUniquenessValidated == true) return;

            _entityTokenUniquenessValidated = true;

            if ((string.IsNullOrEmpty(this.Type) == true) &&
                    (string.IsNullOrEmpty(this.Source) == true) &&
                    (string.IsNullOrEmpty(this.Id) == true))
            {
                throw new InvalidOperationException(string.Format("EntityTokens should be unique for the given element. The properties Type, Source and Id may not all be empty string. This is not the case for this type {0}", GetType()));
            }
        }
    }
}
