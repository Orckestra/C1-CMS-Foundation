using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataKeyPropertyCollection
    {
        private readonly Dictionary<string, object> _keyProperties = new Dictionary<string, object>();


        /// <exclude />
        public void AddKeyProperty(PropertyInfo propertyInfo, object value)
        {
            if (propertyInfo == null) throw new ArgumentNullException("propertyInfo");
            if (value == null) throw new ArgumentNullException("value");

            AddKeyProperty(propertyInfo.Name, value);
        }



        /// <exclude />
        public void AddKeyProperty(string keyPropertyName, object value)
        {
            if (keyPropertyName == null) throw new ArgumentNullException("keyPropertyName");
            if (value == null) throw new ArgumentNullException("value");

            if (_keyProperties.ContainsKey(keyPropertyName)) throw new ArgumentException(string.Format("The key property name '{0}' has already been added", keyPropertyName));

            _keyProperties.Add(keyPropertyName, value);
        }



        /// <exclude />
        public bool TryGetKeyValue(string keyPropertyName, out object value)
        {
            return _keyProperties.TryGetValue(keyPropertyName, out value);
        }



        /// <exclude />
        public IEnumerable<KeyValuePair<string, object>> KeyProperties
        {
            get 
            { 
                return _keyProperties;
            }
        }



        /// <exclude />
        public int Count
        {
            get
            {
                return _keyProperties.Count;
            }
        }



        /// <exclude />
        public override bool Equals(object obj)
        {
            return Equals(obj as DataKeyPropertyCollection);
        }



        /// <exclude />
        public bool Equals(DataKeyPropertyCollection dataKeyPropertyCollection)
        {
            if (dataKeyPropertyCollection == null || dataKeyPropertyCollection.Count != Count) return false;

            foreach (var kvp in this.KeyProperties)
            {
                object value;
                if (!dataKeyPropertyCollection.TryGetKeyValue(kvp.Key, out value)
                    || !kvp.Value.Equals(value))
                {
                    return false;
                }
            }

            return true;
        }



        /// <exclude />
        public override int GetHashCode()
        {
            int hashCode = 0;
            foreach (var kvp in _keyProperties)
            {

                hashCode ^= kvp.Key.GetHashCode();
                hashCode ^= kvp.Value.GetHashCode();
            }

            return hashCode;
        }



        /// <exclude />
        public override string ToString()
        {
            var sb = new StringBuilder();

            bool first = true;
            foreach (var kvp in _keyProperties)
            {
                if (first == false) sb.Append(", ");
                else first = false;
                    
                sb.Append(string.Format("{0} =  {1}", kvp.Key, kvp.Value));
            }

            return sb.ToString();
        }
    }
}
