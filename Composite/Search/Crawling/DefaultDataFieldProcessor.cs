using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.Core.Types;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.Types;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Search.Untranslated;

namespace Composite.Search.Crawling
{
    /// <summary>
    /// The default data field processor.
    /// </summary>
    public class DefaultDataFieldProcessor: IDataFieldProcessor
    {
        /// <exclude />
        public virtual IEnumerable<string> GetTextParts(object value)
        {
            if (value is string str)
            {
                yield return str;
            }
        }

        /// <exclude />
        public virtual object GetIndexValue(object fieldValue)
        {
            return fieldValue == null ? null : ValueTypeConverter.Convert<string>(fieldValue);
        }

        /// <exclude />
        public virtual string[] GetFacetValues(object value)
        {
            if (value == null) return null;

            string stringValue = value.ToString();

            return string.IsNullOrEmpty(stringValue) ? null : new[] { stringValue };
        }

        /// <exclude />
        public virtual string GetDocumentFieldName(PropertyInfo pi)
        {
            if (pi.Name == nameof(IPage.Description) && pi.PropertyType == typeof(string))
            {
                return DocumentFieldNames.Description;
            }

            if ((pi.Name == nameof(IChangeHistory.ChangeDate) || pi.Name == nameof(IMediaFile.CreationTime))
                && (pi.PropertyType == typeof(DateTime) || pi.PropertyType == typeof(DateTime?)))
            {
                return DocumentFieldNames.LastUpdated;
            }

            return $"{pi.ReflectedType.Name}.{pi.Name}";
        }

        /// <exclude />
        public virtual DocumentFieldFacet GetDocumentFieldFacet(PropertyInfo propertyInfo)
        {
            return new DocumentFieldFacet
            {
                Limit = 100,
                MinHitCount = 1,
                PreviewFunction = GetFacetValuePreviewFunction(propertyInfo)
            };
        }

        /// <exclude />
        public virtual DocumentFieldPreview GetDocumentFieldPreview(PropertyInfo propertyInfo)
        {
            return new DocumentFieldPreview
            {
                Sortable = IsFieldSortable(propertyInfo),
                SortTermsAs = GetFieldSortingMethod(propertyInfo.PropertyType),
                PreviewFunction = GetPreviewFunction(propertyInfo),
                FieldOrder = 100
            };
        }

        private SortTermsAs GetFieldSortingMethod(Type propertyType)
        {
            if (propertyType.IsGenericType && propertyType.GetGenericTypeDefinition() == typeof (Nullable<>))
            {
                propertyType = propertyType.GetGenericArguments()[0];
            }

            if (propertyType == typeof (byte))
            {
                return SortTermsAs.Int;
            }

            if (propertyType == typeof(short))
            {
                return SortTermsAs.Int;
            }

            if (propertyType == typeof(int))
            {
                return SortTermsAs.Int;
            }

            if (propertyType == typeof(long))
            {
                return SortTermsAs.Long;
            }

            if (propertyType == typeof(float))
            {
                return SortTermsAs.Float;
            }

            if (propertyType == typeof(decimal))
            {
                return SortTermsAs.Double;
            }

            return SortTermsAs.String;
        }

        /// <exclude />
        public virtual string GetFieldLabel(PropertyInfo propertyInfo)
        {
            var fieldName = GetDocumentFieldName(propertyInfo);
            if (fieldName == DocumentFieldNames.Description)
            {
                return Texts.FieldNames_Description;
            }

            if (fieldName == DocumentFieldNames.LastUpdated) return Texts.FieldNames_LastUpdated;
            if (propertyInfo.Name == nameof(IChangeHistory.ChangedBy)) return Texts.FieldNames_UpdatedBy;
            if (propertyInfo.Name == nameof(IMediaFile.MimeType)) return Texts.FieldNames_MimeType;

            var frpAttribute = propertyInfo.GetCustomAttribute<FormRenderingProfileAttribute>();
            if (!string.IsNullOrEmpty(frpAttribute?.Label))
            {
                return frpAttribute.Label;
            }

            Guid immutableTypeId;
            DataTypeDescriptor dataTypeDescriptor;
            if (propertyInfo.DeclaringType.TryGetImmutableTypeId(out immutableTypeId)
                && DynamicTypeManager.TryGetDataTypeDescriptor(immutableTypeId, out dataTypeDescriptor))
            {
                var fieldDescriptor = dataTypeDescriptor?.Fields.FirstOrDefault(f => f.Name == propertyInfo.Name);
                var label = fieldDescriptor?.FormRenderingProfile?.Label;
                if (label != null)
                {
                    return label;
                }
            }

            return propertyInfo.Name;
        }

        /// <exclude />
        protected virtual DocumentFieldPreview.ValuePreviewDelegate GetPreviewFunction(PropertyInfo propertyInfo)
        {
            return value => value?.ToString();
        }



        /// <exclude />
        protected virtual DocumentFieldFacet.FacetValuePreviewDelegate GetFacetValuePreviewFunction(PropertyInfo propertyInfo)
        {
            return obj => obj;
        }

        private static bool IsFieldSortable(PropertyInfo propertyInfo)
        {
            var attr = propertyInfo.GetCustomAttribute<StoreFieldTypeAttribute>(true);
            Verify.IsNotNull(attr, $"Failed to find and attribute of type '{nameof(StoreFieldTypeAttribute)}'");

            var storeFieldType = attr.StoreFieldType;

            if (storeFieldType.IsString)
            {
                return storeFieldType.MaximumLength <= 64;
            }

            return storeFieldType.IsDateTime
                   || storeFieldType.IsNumeric
                   || storeFieldType.IsBoolean;
        }
    }
}
