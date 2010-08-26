using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Composite.Core.Extensions;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataTypeChangeDescriptor
    {
        private DataTypeDescriptor _original;
        private DataTypeDescriptor _altered;
        private bool _originalTypeDataExists = true;

        public DataTypeChangeDescriptor(DataTypeDescriptor originalTypeDescriptor, DataTypeDescriptor alteredTypeDescriptor)
            : this(originalTypeDescriptor, alteredTypeDescriptor, true)
        {
        }


        internal DataTypeChangeDescriptor(DataTypeDescriptor originalTypeDescriptor, DataTypeDescriptor alteredTypeDescriptor, bool originalTypeDataExists)
        {
            if (originalTypeDescriptor.DataTypeId != alteredTypeDescriptor.DataTypeId) throw new ArgumentException("The original and current data type descriptors must have the same data type id");

            _original = originalTypeDescriptor;
            _altered = alteredTypeDescriptor;
            _originalTypeDataExists = originalTypeDataExists;

            ValidateTypeChanges();
        }


        public bool AlteredTypeHasChanges
        {
            get
            {
                bool alteredTypeHasChanges = false;
                alteredTypeHasChanges |= (this.AlteredType.IsCodeGenerated != this.OriginalType.IsCodeGenerated);
                alteredTypeHasChanges |= (this.AlteredType.Name != this.OriginalType.Name);
                //                alteredTypeHasChanges |= (this.AlteredType.Title != this.OriginalType.Title);
                alteredTypeHasChanges |= (this.AlteredType.Namespace != this.OriginalType.Namespace);
                alteredTypeHasChanges |= (this.AlteredType.TypeManagerTypeName != this.OriginalType.TypeManagerTypeName);
                alteredTypeHasChanges |= this.AddedFields.Count() > 0;
                alteredTypeHasChanges |= this.DeletedFields.Count() > 0;
                alteredTypeHasChanges |= this.AddedKeyFields.Count() > 0;
                alteredTypeHasChanges |= this.DeletedKeyFields.Count() > 0;
                alteredTypeHasChanges |= this.ExistingFields.Where(f => f.AlteredFieldHasChanges == true).Count() > 0;
                alteredTypeHasChanges |= this.AddedDataScopes.Count() > 0;
                alteredTypeHasChanges |= this.DeletedDataScopes.Count() > 0;
                return alteredTypeHasChanges;
            }
        }



        public DataTypeDescriptor OriginalType
        {
            get { return _original; }
        }


        public DataTypeDescriptor AlteredType
        {
            get { return _altered; }
        }


        /// <summary>
        /// True when the system contains data of the original type. Allowable schema changes can be limited when data exists.
        /// </summary>
        public bool OriginalTypeDataExists
        {
            get { return _originalTypeDataExists; }
        }


        /// <summary>
        /// Returns original fields that are no longer part of the altered type.
        /// </summary>
        public IEnumerable<DataFieldDescriptor> DeletedFields
        {
            get
            {
                return _original.Fields.Except(_altered.Fields, new DataFieldIdEqualityComparer());
            }
        }



        /// <summary>
        /// Returns added fields that were not part of the original type.
        /// </summary>
        public IEnumerable<DataFieldDescriptor> AddedFields
        {
            get
            {
                return _altered.Fields.Except(_original.Fields, new DataFieldIdEqualityComparer());
            }
        }


        /// <summary>
        /// Returns fields that exists in both the original and altered type. Fields may have changed name or type.
        /// </summary>
        public IEnumerable<ExistingFieldInfo> ExistingFields
        {
            get
            {
                var existingFields =
                    from altered in _altered.Fields
                    join original in _original.Fields on altered.Id equals original.Id
                    select new ExistingFieldInfo(original, altered);

                return existingFields;
            }
        }



        /// <summary>
        /// Returns original DataScopes that are no longer part of the altered type.
        /// </summary>
        public IEnumerable<DataScopeIdentifier> DeletedDataScopes
        {
            get
            {
                return _original.DataScopes.Where(f => _altered.DataScopes.Count(g => g.Name == f.Name) == 0);
            }
        }



        /// <summary>
        /// Returns new DataScopes that was not part of the original type.
        /// </summary>
        public IEnumerable<DataScopeIdentifier> AddedDataScopes
        {
            get
            {
                return _altered.DataScopes.Where(f => _original.DataScopes.Count(g => g.Name == f.Name) == 0);
            }
        }



        /// <summary>
        /// Returns new DataScopes that was not part of the original type.
        /// </summary>
        public IEnumerable<DataScopeIdentifier> ExistingDataScopes
        {
            get
            {
                return _altered.DataScopes.Where(f => _original.DataScopes.Count(g => g.Name == f.Name) == 1);
            }
        }



        /// <summary>
        /// Returns original key fields that are not part of the altered types key. Fields may have been deleted or demoted to normal fields.
        /// </summary>
        public IEnumerable<DataFieldDescriptor> DeletedKeyFields
        {
            get
            {
                return _original.Fields.Except(_altered.Fields, new DataFieldIdEqualityComparer()).Where(f => _original.KeyPropertyNames.Contains(f.Name));
            }
        }


        /// <summary>
        /// Returns added key fields that were not part of the original types key. Fields may be new or promoted from normal fields.
        /// </summary>
        public IEnumerable<DataFieldDescriptor> AddedKeyFields
        {
            get
            {
                return _altered.Fields.Except(_original.Fields, new DataFieldIdEqualityComparer()).Where(f => _altered.KeyPropertyNames.Contains(f.Name));
            }
        }


        /// <summary>
        /// Returns key fields that exists in both the original and altered type. Fields may have changed name or type.
        /// </summary>
        public IEnumerable<ExistingFieldInfo> ExistingKeyFields
        {
            get
            {
                var existingFields =
                    from altered in _altered.Fields
                    join original in _original.Fields on altered.Id equals original.Id
                    where _altered.KeyPropertyNames.Contains(altered.Name) && _original.KeyPropertyNames.Contains(original.Name)
                    select new ExistingFieldInfo(original, altered);

                return existingFields;
            }
        }


        private void ValidateTypeChanges()
        {
            if (this.OriginalTypeDataExists == true)
            {
                foreach (DataFieldDescriptor addedField in this.AddedFields)
                {
                    if (IsColumnAddable(addedField) == false)
                    {
                        throw new InvalidOperationException("Data type change description is invalid. Added columns must support either null or have a default value. Field name: '{0}'".FormatWith(addedField.Name));
                    }
                }

                foreach (var existingField in this.ExistingFields)
                {

                    if (existingField.OriginalField.IsNullable == true && existingField.AlteredField.IsNullable == false)
                    {
                        throw new InvalidOperationException(string.Format("Data type change description is invalid. Requested convertion for field {0} is not allowed.", existingField.AlteredField.Name));
                    }

                    if (existingField.OriginalField.StoreType.IsConvertibleTo(existingField.AlteredField.StoreType) == false)
                    {
                        throw new InvalidOperationException(string.Format("Data type change description is invalid. Requested convertion for field {0} is not allowed.", existingField.AlteredField.Name));
                    }
                }
            }

            foreach (string keyFieldName in this.AlteredType.KeyPropertyNames)
            {
                if (this.AlteredType.Fields[keyFieldName] == null)
                {
                    throw new InvalidOperationException("Data type change description is invalid. Key field list contains an unknown field name.");
                }
            }

            foreach (string sortOrderFieldName in this.AlteredType.StoreSortOrderFieldNames)
            {
                if (this.AlteredType.Fields[sortOrderFieldName] == null)
                {
                    throw new InvalidOperationException("Data type change description is invalid. Sort order field list contains an unknown field name.");
                }
            }
        }



        private bool IsColumnAddable(DataFieldDescriptor dataFieldDescriptor)
        {
            return dataFieldDescriptor.IsNullable || dataFieldDescriptor.DefaultValue != null;
        }



        public class ExistingFieldInfo
        {
            private DataFieldDescriptor _originalField;
            private DataFieldDescriptor _alteredField;

            internal ExistingFieldInfo(DataFieldDescriptor originalField, DataFieldDescriptor alteredField)
            {
                _originalField = originalField;
                _alteredField = alteredField;
            }

            public DataFieldDescriptor OriginalField
            {
                get { return _originalField; }
            }


            public DataFieldDescriptor AlteredField
            {
                get { return _alteredField; }
                set { _alteredField = value; }
            }

            public bool AlteredFieldHasChanges
            {
                get
                {
                    bool hasChanged = false;
                    hasChanged |= ((_originalField.DefaultValue == null) != (_alteredField.DefaultValue == null));
                    if (_originalField.DefaultValue != null && _alteredField.DefaultValue != null)
                    {
                        hasChanged |= (_originalField.DefaultValue.CompareTo(_alteredField.DefaultValue) != 0);
                    }
                    hasChanged |= (_originalField.InstanceType != _alteredField.InstanceType);
                    hasChanged |= (_originalField.IsNullable != _alteredField.IsNullable);
                    hasChanged |= (_originalField.Name != _alteredField.Name);
                    hasChanged |= (_originalField.StoreType.Serialize() != _alteredField.StoreType.Serialize());
                    return hasChanged;
                }
            }
        }


    }
}
