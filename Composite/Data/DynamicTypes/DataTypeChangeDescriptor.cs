using System;
using System.Linq;
using System.Collections.Generic;
using Composite.Core.Linq;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataTypeChangeDescriptor
    {
        private readonly DataTypeDescriptor _original;
        private readonly DataTypeDescriptor _altered;
        private readonly bool _originalTypeDataExists;


        /// <exclude />
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



        /// <exclude />
        public bool AlteredTypeHasChanges
        {
            get
            {
                bool alteredTypeHasChanges = false;
                alteredTypeHasChanges |= this.AlteredType.IsCodeGenerated != this.OriginalType.IsCodeGenerated;
                alteredTypeHasChanges |= this.AlteredType.Name != this.OriginalType.Name;
                //                alteredTypeHasChanges |= (this.AlteredType.Title != this.OriginalType.Title);
                alteredTypeHasChanges |= this.AlteredType.Namespace != this.OriginalType.Namespace;
                // Do we really need to regenerated the type if it has a new type manager type name?
                //alteredTypeHasChanges |= (this.AlteredType.TypeManagerTypeName != this.OriginalType.TypeManagerTypeName);
                alteredTypeHasChanges |= this.AddedFields.Any();
                alteredTypeHasChanges |= this.DeletedFields.Any();
                alteredTypeHasChanges |= this.AddedKeyFields.Any();
                alteredTypeHasChanges |= this.DeletedKeyFields.Any();
                alteredTypeHasChanges |= this.KeyFieldsOrderChanged;
                alteredTypeHasChanges |= this.ExistingFields.Any(f => f.AlteredFieldHasChanges);
                alteredTypeHasChanges |= this.AddedDataScopes.Any();
                alteredTypeHasChanges |= this.DeletedDataScopes.Any();
                alteredTypeHasChanges |= IndexesChanged;
                alteredTypeHasChanges |= VersionKeyFieldsChanged;
                return alteredTypeHasChanges;
            }
        }



        /// <exclude />
        public DataTypeDescriptor OriginalType => _original;


        /// <exclude />
        public DataTypeDescriptor AlteredType => _altered;


        /// <summary>
        /// True when the system contains data of the original type. Allowable schema changes can be limited when data exists.
        /// </summary>
        public bool OriginalTypeDataExists => _originalTypeDataExists;


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


        IEnumerable<DataFieldDescriptor> GetKeyProperties_Original()
        {
            return _original.KeyPropertyNames
                .Select(name => _original.Fields.Where(fld => fld.Name == name)
                    .FirstOrException("Key property name {0} is not defined in the <Fields> section", name)).ToList();
        }

        IEnumerable<DataFieldDescriptor> GetKeyProperties_Altered()
        {
            return _altered.KeyPropertyNames.Select(name => _altered.Fields.Where(fld => fld.Name == name)
                .FirstOrException("Key property name {0} is not defined in the <Fields> section", name)).ToList();
        }


        /// <summary>
        /// Returns original key fields that are not part of the altered types key. Fields may have been deleted or demoted to normal fields.
        /// </summary>
        public IEnumerable<DataFieldDescriptor> DeletedKeyFields
        {
            get
            {
                return GetKeyProperties_Original().Except(GetKeyProperties_Altered(), new DataFieldIdEqualityComparer());
            }
        }


        /// <summary>
        /// Returns added key fields that were not part of the original types key. Fields may be new or promoted from normal fields.
        /// </summary>
        public IEnumerable<DataFieldDescriptor> AddedKeyFields
        {
            get
            {
                return GetKeyProperties_Altered().Except(GetKeyProperties_Original(), new DataFieldIdEqualityComparer());
            }
        }

        /// <summary>
        /// Returns true if order of key properties have been changed
        /// </summary>
        public bool KeyFieldsOrderChanged
        {
            get
            {
                return !GetKeyProperties_Original().SequenceEqual(GetKeyProperties_Altered(), new DataFieldIdEqualityComparer());
            }
        }

        /// <summary>
        /// Returns <value>true</value> if indexes have changed
        /// </summary>
        public bool IndexesChanged
        {
            get
            {
                var originalIndexes = OriginalType.Indexes;
                var newIndexes = AlteredType.Indexes;

                Func<IReadOnlyCollection<DataTypeIndex>, string> serializeIndexes =
                    indexes => string.Join("|", indexes.Select(i => i.ToString()).OrderBy(a => a));

                return serializeIndexes(originalIndexes) != serializeIndexes(newIndexes);
            }
        }


        /// <summary>
        /// Returns <value>true</value> if version key fields have changed
        /// </summary>
        public bool VersionKeyFieldsChanged
            => !_original.VersionKeyPropertyNames.SequenceEqual(_altered.VersionKeyPropertyNames);
        


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
            if (this.OriginalTypeDataExists)
            {
                foreach (var existingField in this.ExistingFields)
                {
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



        /// <exclude />
        public class ExistingFieldInfo
        {
            private readonly DataFieldDescriptor _originalField;
            private DataFieldDescriptor _alteredField;

            internal ExistingFieldInfo(DataFieldDescriptor originalField, DataFieldDescriptor alteredField)
            {
                _originalField = originalField;
                _alteredField = alteredField;
            }

            /// <exclude />
            public DataFieldDescriptor OriginalField => _originalField;


            /// <exclude />
            public DataFieldDescriptor AlteredField
            {
                get { return _alteredField; }
                set { _alteredField = value; }
            }

            /// <exclude />
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
