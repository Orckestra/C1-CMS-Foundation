using Composite.Core.Types;
using System;
using System.Reflection;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public sealed class ForeignPropertyInfo
	{
        internal ForeignPropertyInfo(PropertyInfo sourcePropertyInfo, Type targetType, string targetKeyPropertyName, bool allowCascadeDeletes, object nullReferenceValue, Type nullReferenceValueType, bool isNullableString)
            : this(sourcePropertyInfo, targetType, targetKeyPropertyName, allowCascadeDeletes, isNullableString)
        {
            this.NullReferenceValue = ValueTypeConverter.Convert( nullReferenceValue, sourcePropertyInfo.PropertyType);
            this.NullReferenceValueType = nullReferenceValueType;
            this.IsNullReferenceValueSet = true;
        }



        internal ForeignPropertyInfo(PropertyInfo sourcePropertyInfo, Type targetType, string targetKeyPropertyName, bool allowCascadeDeletes, bool isNullableString)
        {
            this.SourcePropertyName = sourcePropertyInfo.Name;
            this.SourcePropertyInfo = sourcePropertyInfo;
            this.TargetType = targetType;
            this.TargetKeyPropertyName = targetKeyPropertyName;
            this.AllowCascadeDeletes = allowCascadeDeletes;
            this.IsNullableString = isNullableString;
        }



        /// <exclude />
        public string SourcePropertyName
        {
            get;
            private set;
        }        


        internal PropertyInfo SourcePropertyInfo
        {
            get;
            private set;
        }


        /// <exclude />
        public Type TargetType
        {
            get;
            private set;
        }


        /// <exclude />
        public string TargetKeyPropertyName
        {
            get;
            private set;
        }


        /// <exclude />
        public bool AllowCascadeDeletes
        {
            get;
            private set;
        }


        /// <exclude />
        public object NullReferenceValue
        {
            get;
            private set;
        }


        /// <exclude />
        public Type NullReferenceValueType
        {
            get;
            private set;
        }


        /// <exclude />
        public bool IsNullReferenceValueSet
        {
            get;
            private set;
        }


        /// <exclude />
        public bool IsNullableString
        {
            get;
            private set;
        }


        /// <exclude />
        public bool IsOptionalReference
        {
            get { return IsNullableString || SourcePropertyInfo.PropertyType == typeof (Guid?); }
        }


        internal PropertyInfo TargetKeyPropertyInfo
        {
            get;
            set;
        }
	}
}
