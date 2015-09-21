using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Web;
using Composite.Data;
using Composite.Core.Types;
using Composite.C1Console.Trees.Foundation.AttachmentPoints;


namespace Composite.C1Console.Trees
{
    internal sealed class DataFieldValueHelper
    {
        private const string PreFix = "${C1:Data:";
        private static Regex TemplateRegex = new Regex(@"\$\{(?<string>[^\}]+)}", RegexOptions.Compiled);

        private List<DataFieldValueHelperEntry> _entries = new List<DataFieldValueHelperEntry>();

        public string Template { get; private set; }



        public DataFieldValueHelper(string template)
        {
            this.Template = template;
        }



        public static bool ContainsDataField(string value)
        {
            return value.Contains(PreFix);
        }



        public IEnumerable<Type> InterfaceTypes
        {
            get { return _entries.Select(e => e.InterfaceType);}
        }



        public string ReplaceValues(string currentValue, PiggybagDataFinder piggybagDataFinder, IData currentDataItem = null, bool useUrlEncode = false)
        {
            string result = currentValue;

            foreach (DataFieldValueHelperEntry entry in _entries)
            {
                IData data = piggybagDataFinder.GetData(entry.InterfaceType, currentDataItem);

                object value;
                if (entry.IsReference == false)
                {
                    value = entry.PropertyInfo.GetValue(data, null);

                    if (value == null)
                    {
                        value = "(NULL)";
                    }
                    else if (entry.PropertyInfo.PropertyType == typeof(DateTime))
                    {
                        value = ((DateTime)value).ToString("yyyy MM dd");
                    }
                }
                else
                {
                    IData referencedData = data.GetReferenced(entry.PropertyInfo.Name);

                    value = referencedData.GetLabel();
                }

                string stringValue = value.ToString();

                if (useUrlEncode)
                {
                    stringValue = HttpUtility.UrlEncode(stringValue);
                }

                result = result.Replace(entry.Match, stringValue);
            }

            return result;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="ownerTreeNode">This is only used to add validation errors</param>
        public void Initialize(TreeNode ownerTreeNode)
        {
            foreach (Match match in TemplateRegex.Matches(this.Template))
            {
                if (match.Value.StartsWith(PreFix) == false) continue;

                string value = match.Groups["string"].Value;
                string[] values = value.Split(':');
                if (values.Length != 4)
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.DataFieldValueHelper.WrongFormat", match.Value, string.Format(@"{0}[InterfaceType]:[FieldName]}}", PreFix));
                    return;
                }


                string typeName = values[2];
                Type interfaceType = TypeManager.TryGetType(typeName);
                if (interfaceType == null)
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.Common.UnknownInterfaceType", typeName);
                    return;
                }

                if (typeof(IData).IsAssignableFrom(interfaceType) == false)
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.Common.NotImplementingIData", interfaceType, typeof(IData));
                    return;
                }


                string fieldName = values[3];
                PropertyInfo propertyInfo = interfaceType.GetPropertiesRecursively(f => f.Name == fieldName).SingleOrDefault();
                if (propertyInfo == null)
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.Common.MissingProperty", interfaceType, fieldName);
                    return;
                }

                bool possibleAttachmentPointsExist = ownerTreeNode.Tree.PossibleAttachmentPoints.OfType<IDataItemAttachmentPoint>().Any(f => f.InterfaceType == interfaceType);
                bool attachmentPointsExist = ownerTreeNode.Tree.AttachmentPoints.OfType<IDataItemAttachmentPoint>().Any(f => f.InterfaceType == interfaceType);
                if (!possibleAttachmentPointsExist 
                    && !attachmentPointsExist 
                    && !ownerTreeNode.SelfAndParentsHasInterface(interfaceType))
                {
                    ownerTreeNode.AddValidationError("TreeValidationError.DataFieldValueHelper.InterfaceNotInParentTree", interfaceType);
                    return;
                }

                bool isReferencingProperty = DataReferenceFacade.GetForeignKeyProperties(interfaceType).Any(f => f.SourcePropertyInfo.Equals(propertyInfo));

                DataFieldValueHelperEntry entry = new DataFieldValueHelperEntry(
                    match.Value,
                    interfaceType,
                    propertyInfo,
                    isReferencingProperty
                );

                if (_entries.Contains(entry) == false)
                {
                    _entries.Add(entry);
                }
            }
        }




        private sealed class DataFieldValueHelperEntry
        {
            public DataFieldValueHelperEntry(string match, Type interfaceType, PropertyInfo propertyInfo, bool isReference)
            {
                this.Match = match;
                this.InterfaceType = interfaceType;
                this.PropertyInfo = propertyInfo;
                this.IsReference = isReference;
            }


            public string Match { get; private set; }
            public Type InterfaceType { get; private set; }
            public PropertyInfo PropertyInfo { get; private set; }
            public bool IsReference { get; private set; }


            public override bool Equals(object obj)
            {
                return Equals(obj as DataFieldValueHelperEntry);
            }


            public bool Equals(DataFieldValueHelperEntry entry)
            {
                return entry != null && object.Equals(this.Match, entry.Match);
            }


            public override int GetHashCode()
            {
                return this.Match.GetHashCode();
            }
        }
    }
}
