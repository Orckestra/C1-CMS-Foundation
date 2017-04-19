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


        /// <exclude />
        public AssociatedDataElementProviderHelperEntityToken(string type, string providerName, string id, string payload)
        {
            _type = type;
            _providerName = providerName;
            _id = id;

            this.Payload = payload;
        }


        /// <exclude />
        public override string Type
        {
            get { return _type; }
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
        public string Payload
        {
            get;
            private set;
        }


        /// <exclude />
        public Type GetInterfaceType()
        {
            Type type = TypeManager.GetType(this.Type);

            return type;
        }


        /// <exclude />
        public IData GetData()
        {
            Type type = TypeManager.GetType(this.Type);

            object id = ValueTypeConverter.Convert(this.Id, type.GetKeyProperties()[0].PropertyType);

            IData data = DataFacade.TryGetDataByUniqueKey(type, id);

            return data;
        }

        /// <exclude />
        public IEnumerable<IData> GetDataList()
        {
            Type type = TypeManager.GetType(this.Type);

            object id = ValueTypeConverter.Convert(this.Id, type.GetKeyProperties()[0].PropertyType);

            var datas = DataFacade.TryGetDataVersionsByUniqueKey(type, id);

            return datas;
        }

        /// <exclude />
        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();

            DoSerialize(sb);

            StringConversionServices.SerializeKeyValuePair(sb, "_Payload_", this.Payload);

            return sb.ToString();
        }


        /// <exclude />
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


        /// <exclude />
        public override bool Equals(object obj)
        {
            return base.Equals(obj) 
                && (obj as AssociatedDataElementProviderHelperEntityToken).Payload == this.Payload;
        }


        /// <exclude />
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
