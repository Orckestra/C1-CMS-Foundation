using System;
using System.Diagnostics;
using System.Reflection;
using System.Collections.Generic;


namespace Composite.Types
{
    [DebuggerDisplay("Name = {Name}, Type = {PropertyType}, DeclaringType={DeclaringTypeFullName}")]
    public sealed class BuildManagerPropertyInfo
    {
        private Type _declaringType = null;
        private string _declaringTypeFullName = null;
        private List<object> _customAttributes = new List<object>();


        public BuildManagerPropertyInfo(string name, Type propertyType, string declaringTypeFullName, bool canRead, bool canWrite, IEnumerable<object> customAttributes)
        {
            this.Name = name;
            this.PropertyType = propertyType;
            this.CanRead = canRead;
            this.CanWrite = canWrite;

            _declaringTypeFullName = declaringTypeFullName;
            _customAttributes.AddRange(customAttributes);
        }


        public BuildManagerPropertyInfo(PropertyInfo propertyInfo)
        {
            this.Name = propertyInfo.Name;
            this.PropertyType = propertyInfo.PropertyType;
            this.CanRead = propertyInfo.CanRead;
            this.CanWrite = propertyInfo.CanWrite;

            _declaringType = propertyInfo.DeclaringType;

            _customAttributes.AddRange(propertyInfo.GetCustomAttributes(true));
        }


        public BuildManagerPropertyInfo(string name, Type propertyType, Type declaringType, bool canRead, bool canWrite, IEnumerable<object> customAttributes)
        {
            this.Name = name;
            this.PropertyType = propertyType;
            this.CanRead = canRead;
            this.CanWrite = canWrite;

            _declaringType = declaringType;
            _customAttributes.AddRange(customAttributes);
        }


        public string Name { get; private set; }
        public Type PropertyType { get; private set; }
        public bool CanRead { get; private set; }
        public bool CanWrite { get; private set; }


        public Type DeclaringType
        {
            get
            {
                return _declaringType;
            }
        }


        public string DeclaringTypeFullName
        {
            get
            {
                if (_declaringTypeFullName != null)
                {
                    return _declaringTypeFullName;

                }
                else if (_declaringType != null)
                {
                    return _declaringType.FullName;
                }
                else
                {
                    throw new InvalidOperationException();
                }
            }
        }


        public IEnumerable<T> GetCustomAttributes<T>()
            where T : Attribute
        {
            foreach (object attribute in _customAttributes)
            {
                if ((attribute is T) == true)
                {
                    yield return (T)attribute;
                }
            }
        }


        public override bool Equals(object obj)
        {
            return Equals(obj as BuildManagerPropertyInfo);
        }


        public bool Equals(BuildManagerPropertyInfo buildManagerPropertyInfo)
        {
            if (buildManagerPropertyInfo == null) return false;

            return buildManagerPropertyInfo.Name == this.Name;
        }


        public override int GetHashCode()
        {
            return this.Name.GetHashCode();
        }


        public override string ToString()
        {
            return this.Name;
        }
    }
}
