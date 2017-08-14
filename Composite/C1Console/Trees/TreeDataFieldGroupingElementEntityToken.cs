using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;
using Composite.Core.Extensions;
using Composite.Core.Serialization;
using Composite.Core.Types;
using Composite.C1Console.Trees.Foundation;


namespace Composite.C1Console.Trees
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    public sealed class TreeDataFieldGroupingElementEntityToken : EntityToken
    {
        private const string _magicNullValue = "·NULL·";

        private string _treeNodeId;
        private string _treeId;
        private string _type;

        private Dictionary<string, object> _groupingValues = null;
        private Dictionary<string, int> _folderRangeValues = null;
        private Dictionary<string, string> _deserializeDictionary; // Used for lazy deserializing grouping values

        private int _hashCode = 0;



        /// <exclude />
        public TreeDataFieldGroupingElementEntityToken(string treeNodeId, string treeId, string dataType)
        {
            _treeNodeId = treeNodeId;
            _treeId = treeId;
            _type = dataType;
            _deserializeDictionary = new Dictionary<string, string>();
        }



        /// <exclude />
        public TreeDataFieldGroupingElementEntityToken(string treeNodeId, string treeId, string dataType, Dictionary<string, string> deserializeDictionary)
            : this(treeNodeId, treeId, dataType)
        {
            _deserializeDictionary = deserializeDictionary;
        }


        /// <summary>
        /// Contains the interface type (serialized)
        /// </summary>
        public override string Type
        {
            get { return _type; }
        }



        /// <summary>
        /// Contains the Id of the tree
        /// </summary>
        public override string Source
        {
            get { return _treeId; }
        }



        /// <summary>
        /// Contains the Id of the owner tree node
        /// </summary>
        public override string Id
        {
            get { return _treeNodeId; }
        }



        /// <exclude />
        public string TreeNodeId
        {
            get
            {
                return this.Id;
            }
        }



        /// <exclude />
        public Dictionary<string, object> GroupingValues
        {
            get
            {
                if (_groupingValues == null)
                {
                    _groupingValues = new Dictionary<string, object>();

                    Type dataType = TypeManager.GetType(this.Type);

                    List<PropertyInfo> propertyInfos = dataType.GetPropertiesRecursively();
                    foreach (var kvp in _deserializeDictionary)
                    {
                        string propertyName = kvp.Key;
                        if (propertyName.StartsWith("■"))
                        {
                            propertyName = propertyName.Substring(1).Substring(0, propertyName.IndexOf("_", System.StringComparison.Ordinal) - 1);
                        }

                        PropertyInfo propertyInfo = propertyInfos.SingleOrDefault(f => f.Name == propertyName);
                        if (propertyInfo == null) continue;

                        object value = null;

                        if (kvp.Value != _magicNullValue)
                        {
                            if (propertyInfo.PropertyType == typeof(DateTime))
                            {
                                value = StringConversionServices.DeserializeValue(kvp.Value, typeof(string));
                            }
                            else
                            {
                                value = StringConversionServices.DeserializeValue(kvp.Value, propertyInfo.PropertyType);
                            }
                        }

                        _groupingValues.Add(kvp.Key, value);
                    }
                }

                return _groupingValues;
            }
            set
            {
                _groupingValues = value;
            }
        }



        /// <exclude />
        public Dictionary<string, object> DeserializedGroupingValues
        {
            get
            {
                Dictionary<string, object> result = new Dictionary<string, object>();

                Type dataType = TypeManager.GetType(this.Type);
                List<PropertyInfo> propertyInfos = dataType.GetPropertiesRecursively();

                foreach (var kvp in this.GroupingValues)
                {
                    string propertyName = kvp.Key;
                    if (propertyName.StartsWith("■"))
                    {
                        propertyName = propertyName.Substring(1).Substring(0, propertyName.IndexOf("_", System.StringComparison.Ordinal) - 1);
                    }

                    object value = kvp.Value;

                    PropertyInfo propertyInfo = propertyInfos.SingleOrDefault(f => f.Name == propertyName);
                    if (propertyInfo.PropertyType == typeof(DateTime))
                    {
                        if (result.ContainsKey(propertyName))
                        {
                            value = DateTimeFormater.Deserialize((string)value, (DateTime)result[propertyName]);
                            result[propertyName] = value;
                        }
                        else
                        {
                            value = DateTimeFormater.Deserialize((string)value);
                            result.Add(propertyName, value);
                        }
                    }
                    else
                    {
                        result.Add(propertyName, value);
                    }

                }

                return result;
            }
        }



        /// <exclude />
        public Dictionary<string, int> FolderRangeValues
        {
            get
            {
                if (_folderRangeValues == null)
                {
                    _folderRangeValues = new Dictionary<string, int>();

                    foreach (var kvp in _deserializeDictionary)
                    {
                        if (kvp.Key.StartsWith("·") == false) continue;

                        int value = (int)StringConversionServices.DeserializeValue(kvp.Value, typeof(int));

                        _folderRangeValues.Add(kvp.Key.Substring(1), value);
                    }
                }

                return _folderRangeValues;
            }
            set
            {
                _folderRangeValues = value;
            }
        }


        /// <exclude />
        public Type ChildGeneratingDataElementsReferenceType { get; set; }

        /// <exclude />
        public object ChildGeneratingDataElementsReferenceValue { get; set; }



        /// <exclude />
        public override int GetHashCode()
        {
            if (_hashCode != 0)
            {
                return _hashCode;
            }

            int hashCode = base.GetHashCode();

            if (this.GroupingValues != null)
            {
                foreach (var kvp in this.GroupingValues/*.SortByKeys()*/)
                {
                    hashCode ^= kvp.Key.GetHashCode();
                    if (kvp.Value != null)
                    {
                        hashCode ^= kvp.Value.GetHashCode();
                    }
                }
            }

            if (this.FolderRangeValues != null)
            {
                foreach (var kvp in this.FolderRangeValues/*.SortByKeys()*/)
                {
                    hashCode ^= kvp.Key.GetHashCode();
                    hashCode ^= kvp.Value.GetHashCode();
                }
            }

            if (this.ChildGeneratingDataElementsReferenceType != null)
            {
                hashCode ^= ChildGeneratingDataElementsReferenceType.GetHashCode();
            }

            if (this.ChildGeneratingDataElementsReferenceValue != null)
            {
                hashCode ^= ChildGeneratingDataElementsReferenceValue.GetHashCode();
            }

            return _hashCode = hashCode;
        }



        /// <exclude />
        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();
            DoSerialize(sb);

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


            foreach (var kvp in this.FolderRangeValues.SortByKeys())
            {
                StringConversionServices.SerializeKeyValuePair(sb, "·" + kvp.Key, kvp.Value, kvp.Value.GetType());
            }

            if (this.ChildGeneratingDataElementsReferenceType != null)
            {
                StringConversionServices.SerializeKeyValuePair(sb, "_ReferenceType_", TypeManager.SerializeType(this.ChildGeneratingDataElementsReferenceType));
            }

            if (this.ChildGeneratingDataElementsReferenceValue != null)
            {
                StringConversionServices.SerializeKeyValuePair(sb, "_ReferenceValueType_", this.ChildGeneratingDataElementsReferenceValue.GetType());
                StringConversionServices.SerializeKeyValuePair(sb, "_ReferenceValue_", this.ChildGeneratingDataElementsReferenceValue, this.ChildGeneratingDataElementsReferenceValue.GetType());
            }

            return sb.ToString();
        }



        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;
            Dictionary<string, string> dic;

            DoDeserialize(serializedEntityToken, out type, out source, out id, out dic);

            TreeDataFieldGroupingElementEntityToken entityToken = new TreeDataFieldGroupingElementEntityToken(id, source, type, dic);

            if (dic.ContainsKey("_ReferenceType_"))
            {
                string typeString = StringConversionServices.DeserializeValueString(dic["_ReferenceType_"]);

                entityToken.ChildGeneratingDataElementsReferenceType = TypeManager.GetType(typeString);
            }

            if (dic.ContainsKey("_ReferenceValueType_"))
            {
                Type referenceValueType = StringConversionServices.DeserializeValueType(dic["_ReferenceValueType_"]);
                entityToken.ChildGeneratingDataElementsReferenceValue = StringConversionServices.DeserializeValue(dic["_ReferenceValue_"], referenceValueType);
            }

            return entityToken;
        }



        /// <exclude />
        public override string OnGetExtraPrettyHtml()
        {
            StringBuilder sb = new StringBuilder();
            foreach (var kvp in this.GroupingValues.SortByKeys())
            {
                sb.Append("<b>" + kvp.Key + " = </b> " + kvp.Value.ToString() + "<br />");
            }

            foreach (var kvp in this.FolderRangeValues.SortByKeys())
            {
                sb.Append("<b>" + kvp.Key + " = </b> " + kvp.Value.ToString() + "<br />");
            }

            if (this.ChildGeneratingDataElementsReferenceValue != null)
            {
                sb.Append("<b>" + "ChildGenRef" + " = </b> " + this.ChildGeneratingDataElementsReferenceValue.ToString() + "<br />");
            }
            else
            {
                sb.Append("<b>" + "ChildGenRef" + " = </b> " + "(null)" + "<br />");
            }
            return sb.ToString();
        }



        /// <exclude />
        public override void OnGetPrettyHtml(EntityTokenHtmlPrettyfier prettyfier)
        {
            prettyfier.AddCustomProperty("GroupingValues", (name, value, helper) =>
            {
                Dictionary<string, object> dic = (Dictionary<string, object>)value;

                StringBuilder sb = new StringBuilder();
                foreach (var kvp in dic)
                {
                    sb.Append("<b>" + kvp.Key + ":</b> " + kvp.Value.ToString() + "<br />");
                }

                helper.AddFullRow(new string[] { "<b>" + name + "</b>", sb.ToString() });
            });


            prettyfier.AddCustomProperty("FolderRangeValues", (name, value, helper) =>
            {
                Dictionary<string, int> dic = (Dictionary<string, int>)value;

                StringBuilder sb = new StringBuilder();
                foreach (var kvp in dic)
                {
                    sb.Append("<b>" + kvp.Key + ":</b> " + kvp.Value.ToString() + "<br />");
                }

                helper.AddFullRow(new [] { "<b>" + name + "</b>", sb.ToString() });
            });

            prettyfier.AddCustomProperty("ChildGeneratingDataElementsReferenceType", (name, value, helper) =>
            {
                helper.AddFullRow(new[] { "<b>" + name + "</b>", EntityTokenHtmlPrettyfier.GetTypeHtml((value ?? "(null)").ToString()) });
            });

            prettyfier.AddCustomProperty("ChildGeneratingDataElementsReferenceValue", (name, value, helper) =>
            {
                helper.AddFullRow(new [] { "<b>" + name + "</b>", (value ?? "(null)").ToString() });
            });
        }
    }
}
