using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;
using Composite.Core.Serialization;
using Composite.Core.Types;
using Composite.Core.Extensions;



namespace Composite.C1Console.Elements.ElementProviderHelpers.DataGroupingProviderHelper
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    public sealed class DataGroupingProviderHelperEntityToken : EntityToken
    {
        private const string _magicNullValue = "·NULL·";
        private string _type;
        private string _payload;


        /// <exclude />
        public DataGroupingProviderHelperEntityToken(string type)
        {
            _type = type;
        }

        /// <exclude />
        public override string Type
        {
            get { return _type; }
        }



        /// <exclude />
        public override string Source
        {
            get { return ""; }
        }



        /// <exclude />
        public override string Id
        {
            get { return ""; }
        }



        /// <exclude />
        public Dictionary<string, object> GroupingValues
        {
            get;
            set;
        }

        /// <exclude />
        public string Payload
        {
            get { return _payload; }
            set { _payload = value; }
        }



        /// <exclude />
        [Obsolete("Use 'Type' property instead.")]
        public string SerializedTypeName
        {
            get
            {
                return Type;
            }
        }


        /// <exclude />
        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();
            DoSerialize(sb);

            if (!_payload.IsNullOrEmpty())
            {
                StringConversionServices.SerializeKeyValuePair(sb, "Payload", _payload, typeof(string));
            }

            foreach (var kvp in this.GroupingValues.SortByKeys())
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



        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;
            Dictionary<string, string> dic;

            DoDeserialize(serializedEntityToken, out type, out source, out id, out dic);

            var entityToken = new DataGroupingProviderHelperEntityToken(type);

            if (dic.ContainsKey("Payload"))
            {
                entityToken._payload = dic["Payload"];
            }            

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



        /// <exclude />
        public override int GetHashCode()
        {
            int hashCode = this.Id.GetHashCode() ^ this.Type.GetHashCode() ^ this.Source.GetHashCode();

            foreach (var kvp in this.GroupingValues.SortByKeys())
            {
                hashCode ^= kvp.Key.GetHashCode();
                if (kvp.Value != null)
                {
                    hashCode ^= kvp.Value.GetHashCode();
                }
            }

            return hashCode;
        }


        /// <exclude />
        public override string OnGetExtraPrettyHtml()
        {
            StringBuilder sb = new StringBuilder();
            foreach (var kvp in this.GroupingValues.SortByKeys())
            {
                sb.Append("<b>" + kvp.Key + " = </b> " + HttpUtility.HtmlEncode(kvp.Value) + "<br />");
            }

            return sb.ToString();
        }
    }    
}
