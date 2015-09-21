using System;
using System.Collections.Generic;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataFieldNameCollection : IEnumerable<string>
    {
        private readonly List<string> _dataFieldNames = new List<string>();
        private readonly DataFieldDescriptorCollection _validDataFieldDescriptions;
        private readonly bool _allowNullableFields;
        private readonly bool _allowListFields;
        private readonly bool _allowLargeStringFields;


        internal DataFieldNameCollection(DataFieldDescriptorCollection validDataFieldDescriptions, bool allowNullableFields, bool allowListFields, bool allowLargeStringFields)
        {
            _validDataFieldDescriptions = validDataFieldDescriptions;
            _allowNullableFields = allowNullableFields;
            _allowListFields = allowListFields;
            _allowLargeStringFields = allowLargeStringFields;
        }


        /// <exclude />
        public void Add(string dataFieldName)
        {
            Add(dataFieldName, true);
        }


        /// <exclude />
        public void Add(string dataFieldName, bool validateFieldMemberShip)
        {
            if (validateFieldMemberShip)
            {
                ValidateFieldMembership(dataFieldName);
            }

            _dataFieldNames.Add(dataFieldName);
        }


        /// <exclude />
        public void Remove(string dataFieldName)
        {
            _dataFieldNames.Remove(dataFieldName);
        }


        /// <exclude />
        public void Clear()
        {
            _dataFieldNames.Clear();
        }


        /// <exclude />
        public bool Contains(string fieldName)
        {
            return _dataFieldNames.Contains(fieldName);
        }


        /// <exclude />
        public int Count
        {
            get { return _dataFieldNames.Count; }
        }


        /// <exclude />
        public string this[int index]
        {
            get { return _dataFieldNames[index]; }
        }


        /// <exclude />
        public IEnumerator<string> GetEnumerator()
        {
            return _dataFieldNames.GetEnumerator();
        }


        /// <exclude />
        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return _dataFieldNames.GetEnumerator();
        }


        internal void ValidateMembers()
        {
            foreach (string fieldName in _dataFieldNames)
            {
                ValidateFieldMembership(fieldName);
            }
        }


        private void ValidateFieldMembership(string dataFieldName)
        {
            DataFieldDescriptor dataFieldDescriptor = _validDataFieldDescriptions[dataFieldName];
            if (dataFieldDescriptor == null) throw new ArgumentException(string.Format("Unknown data field name '{0}'", dataFieldName));
            if (_allowNullableFields == false && dataFieldDescriptor.IsNullable) throw new ArgumentException("Can not add nullable fields to this list");
            if (dataFieldDescriptor.StoreType.PhysicalStoreType == PhysicalStoreFieldType.LargeString && _allowLargeStringFields == false) throw new ArgumentException("Can not add large string fields to this list");
        }
    }
}
