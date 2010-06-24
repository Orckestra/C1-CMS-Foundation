using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Composite.Security;
using Composite.Security.SecurityAncestorProviders;
using Composite.Serialization;
using Composite.Types;



namespace Composite.Elements.ElementProviderHelpers.DataGroupingProviderHelper
{
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    public sealed class DataGroupingProviderHelperEntityToken : EntityToken
    {
        private const string _magicNullValue = "·NULL·";
        private string _type;



        public DataGroupingProviderHelperEntityToken(string type)
        {
            _type = type;
        }



        public override string Type
        {
            get { return _type; }
        }



        public override string Source
        {
            get { return ""; }
        }



        public override string Id
        {
            get { return ""; }
        }




        public Dictionary<string, object> GroupingValues
        {
            get;
            set;
        }

        [Obsolete("Use 'Type' property instead.")]
        public string SerializedTypeName
        {
            get
            {
                return Type;
            }
        }

        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();
            DoSerialize(sb);

            foreach (var kvp in this.GroupingValues)
            {
                if (kvp.Value != null)
                {
                    StringConversionServices.SerializeKeyValuePair(sb, kvp.Key, kvp.Value, kvp.Value.GetType());
                }
                else
                {
                    StringConversionServices.SerializeKeyValuePair(sb, kvp.Key, _magicNullValue, typeof(string));
                }
            }

            return sb.ToString();
        }



        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;
            Dictionary<string, string> dic;

            DoDeserialize(serializedEntityToken, out type, out source, out id, out dic);

            DataGroupingProviderHelperEntityToken entityToken = new DataGroupingProviderHelperEntityToken(type);
            entityToken.GroupingValues = new Dictionary<string, object>();

            Type dataType = TypeManager.GetType(type);

            List<PropertyInfo> propertyInfos = dataType.GetPropertiesRecursively();
            foreach (var kvp in dic)
            {
                PropertyInfo propertyInfo = propertyInfos.Where(f => f.Name == kvp.Key).SingleOrDefault();

                if (propertyInfo == null) continue;

                object value = null;
                if (kvp.Value != _magicNullValue)
                {
                    value = StringConversionServices.DeserializeValue(kvp.Value, propertyInfo.PropertyType);
                }


                entityToken.GroupingValues.Add(kvp.Key, value);
            }

            return entityToken;
        }



        public override int GetHashCode()
        {
            int hashCode = this.Id.GetHashCode() ^ this.Type.GetHashCode() ^ this.Source.GetHashCode();

            foreach (var kvp in this.GroupingValues)
            {
                hashCode ^= kvp.Key.GetHashCode();
                if (kvp.Value != null)
                {
                    hashCode ^= kvp.Value.GetHashCode();
                }
            }

            return hashCode;
        }
    }    
}
