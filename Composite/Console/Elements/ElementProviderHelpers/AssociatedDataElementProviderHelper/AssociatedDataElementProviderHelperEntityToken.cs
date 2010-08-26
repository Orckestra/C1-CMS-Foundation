using System;
using System.Collections.Generic;
using System.Text;
using Composite.Data;
using Composite.C1Console.Security;
using Composite.Core.Serialization;
using Composite.Core.Types;


namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(AssociatedDataElementProviderHelperSecurityAncestorProvider))]
    public sealed class AssociatedDataElementProviderHelperEntityToken : EntityToken
    {
        private string _type;
        private string _providerName;
        private string _id;

        private int _hashCode = 0;

        public AssociatedDataElementProviderHelperEntityToken(string type, string providerName, string id, string payload)
        {
            _type = type;
            _providerName = providerName;
            _id = id;

            this.Payload = payload;
        }

        public override string Type
        {
            get { return _type; }
        }

        public override string Source
        {
            get { return _providerName; }
        }

        public override string Id
        {
            get { return _id; }
        }
        
        public string Payload
        {
            get;
            private set;
        }


        public Type GetInterfaceType()
        {
            Type type = TypeManager.GetType(this.Type);

            return type;
        }


        public IData GetData()
        {
            Type type = TypeManager.GetType(this.Type);

            object id = ValueTypeConverter.Convert(this.Id, type.GetKeyPropertyInfoes()[0].PropertyType);

            IData data = DataFacade.TryGetDataByUniqueKey(type, id);

            return data;
        }


        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();

            DoSerialize(sb);

            StringConversionServices.SerializeKeyValuePair(sb, "_Payload_", this.Payload);

            return sb.ToString();
        }


        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;
            Dictionary<string, string> dic;

            DoDeserialize(serializedEntityToken, out type, out source, out id, out dic);

            if (dic.ContainsKey("_Payload_") == false) 
            {
                throw new ArgumentException("The serializedEntityToken is not a serialized entity token", "serializedEntityToken");
            }

            string payload = StringConversionServices.DeserializeValueString(dic["_Payload_"]);

            return new AssociatedDataElementProviderHelperEntityToken(type, source, id, payload);
        }


        public override bool Equals(object obj)
        {
            return Equals(obj as AssociatedDataElementProviderHelperEntityToken);
        }


        public bool Equals(AssociatedDataElementProviderHelperEntityToken entityToken)
        {
            if (entityToken == null) return false;

            return entityToken.Source == this.Source &&
                   entityToken.Type == this.Type &&
                   entityToken.Id == this.Id &&
                   entityToken.Payload == this.Payload;
        }


        public override int GetHashCode()
        {
            if (_hashCode == 0)
            {
                _hashCode =
                    this.GetType().GetHashCode() ^
                    this.Source.GetHashCode() ^
                    this.Type.GetHashCode() ^
                    this.Id.GetHashCode() ^
                    this.Payload.GetHashCode();
            }

            return _hashCode;
        }
    }
}
