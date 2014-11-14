using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Extensions;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataFieldDescriptorCollection : IEnumerable<DataFieldDescriptor>
    {
        private readonly DataTypeDescriptor _parent;
        private readonly List<DataFieldDescriptor> _descriptors = new List<DataFieldDescriptor>();


        internal DataFieldDescriptorCollection(DataTypeDescriptor parent) 
        {
            _parent = parent;
        }


        /// <exclude />
        public int Count
        {
            get { return _descriptors.Count; }
        }

        /// <exclude />
        public void Add(DataFieldDescriptor descriptor)
        {
            Verify.ArgumentNotNull(descriptor, "descriptor");

            if (_descriptors.Contains(descriptor))
            {
                throw new ArgumentException("The specifed DataFieldDescriptor with ID '{0}' has already been added. ".FormatWith(descriptor.Id) +
                                            "Developers should ensure that the Immutable Field Id is unique on all fields.");
            }

            if (this[descriptor.Name] != null)
            {
                throw new InvalidOperationException("The specified field name '{0}' is in use by another DataFieldDescriptor".FormatWith(descriptor.Name));
            }
            if (this[descriptor.Id] != null)
            {
                throw new InvalidOperationException("The specified field Id '{0}' is in use by another DataFieldDescriptor".FormatWith(descriptor.Id));
            }

            _descriptors.Add(descriptor);
        }


        /// <exclude />
        public void Insert(int index, DataFieldDescriptor descriptor)
        {
            Verify.ArgumentNotNull(descriptor, "descriptor");

            if (_descriptors.Contains(descriptor)) throw new ArgumentException("The specified DataFieldDescriptor with ID '{0}' has already been added".FormatWith(descriptor.Id));

            if (this[descriptor.Name] != null)
            {
                throw new InvalidOperationException("The specified field name '{0}' is in use by another DataFieldDescriptor".FormatWith(descriptor.Name));
            }

            if (this[descriptor.Id] != null)
            {
                throw new InvalidOperationException("The specified field Id '{0}' is in use by another DataFieldDescriptor".FormatWith(descriptor.Id));
            }

            _descriptors.Insert(index, descriptor);
        }


        /// <exclude />
        public void Remove(DataFieldDescriptor descriptor)
        {
            Verify.ArgumentNotNull(descriptor, "descriptor");
            if (!_descriptors.Contains(descriptor)) throw new ArgumentException("The specified DataFieldDescriptor was not found");
            if (_parent.KeyPropertyNames.Contains(descriptor.Name)) throw new ArgumentException("The DataFieldDescriptor can not be removed while it is a member of the key field list.");
            if (_parent.StoreSortOrderFieldNames.Contains(descriptor.Name)) throw new ArgumentException("The DataFieldDescriptor can not be removed while it is a member of the physical sort order field list.");

            _descriptors.Remove(descriptor);
        }


        /// <exclude />
        public bool Contains(DataFieldDescriptor descriptor)
        {
            Verify.ArgumentNotNull(descriptor, "descriptor");

            return _descriptors.Contains(descriptor);
        }


        /// <exclude />
        public DataFieldDescriptor this[string name]
        {
            get { return _descriptors.SingleOrDefault(d => d.Name == name); }
        }


        /// <exclude />
        public DataFieldDescriptor this[Guid id]
        {
            get { return _descriptors.SingleOrDefault(d => d.Id == id); }
        }


        /// <exclude />
        public IEnumerator<DataFieldDescriptor> GetEnumerator()
        {
            return _descriptors.OrderBy(f => f.Position).GetEnumerator();
        }


        /// <exclude />
        IEnumerator IEnumerable.GetEnumerator()
        {
            return _descriptors.OrderBy(f => f.Position).GetEnumerator();
        }
    }
}
