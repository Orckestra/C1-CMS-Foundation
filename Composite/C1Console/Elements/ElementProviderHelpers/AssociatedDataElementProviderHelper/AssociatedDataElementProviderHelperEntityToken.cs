using System;
using System.Collections.Generic;
using Composite.Data;
using Composite.C1Console.Security;
using Composite.Core.Serialization;
using Composite.Core.Types;
using Newtonsoft.Json;


namespace Composite.C1Console.Elements.ElementProviderHelpers.AssociatedDataElementProviderHelper
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(AssociatedDataElementProviderHelperSecurityAncestorProvider))]
    public sealed class AssociatedDataElementProviderHelperEntityToken : EntityToken
    {
        private readonly string _providerName;

        private int _hashCode = 0;


        /// <exclude />
        [JsonConstructor]
        public AssociatedDataElementProviderHelperEntityToken(string type, string providerName, string id, string payload)
        {
            Type = type;
            _providerName = providerName;
            Id = id;

            this.Payload = payload;
        }


        /// <exclude />
        public override string Type { get; }


        /// <exclude />
        [JsonProperty(PropertyName = "providerName")]
        public override string Source => _providerName;


        /// <exclude />
        public override string Id { get; }


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
            return CompositeJsonSerializer.Serialize(this);
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            return CompositeJsonSerializer
                .Deserialize<AssociatedDataElementProviderHelperEntityToken>(serializedEntityToken);
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
