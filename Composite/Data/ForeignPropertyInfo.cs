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
            this.NullReferenceValue = nullReferenceValue;
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


        public Type TargetType
        {
            get;
            private set;
        }


        public string TargetKeyPropertyName
        {
            get;
            private set;
        }


        public bool AllowCascadeDeletes
        {
            get;
            private set;
        }


        public object NullReferenceValue
        {
            get;
            private set;
        }


        public Type NullReferenceValueType
        {
            get;
            private set;
        }


        public bool IsNullReferenceValueSet
        {
            get;
            private set;
        }

        public bool IsNullableString
        {
            get;
            private set;
        }


        public bool IsOptionalReference
        {
            get { return SourcePropertyInfo.PropertyType == typeof (Guid?); }
        }

        internal PropertyInfo TargetKeyPropertyInfo
        {
            get;
            set;
        }
	}
}
