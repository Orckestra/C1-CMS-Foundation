using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Data
{
    /// <summary>
    /// Represents a reference to a C1 CMS IData item. See <see cref="DataReference{T}"/>.
    /// </summary>
    public interface IDataReference
	{
        /// <summary>
        /// The type of the data item. This type inherits from IData.
        /// </summary>
        Type ReferencedType { get; }

        /// <summary>
        /// If the reference has not been set this is false.
        /// </summary>
        bool IsSet { get; }

        /// <summary>
        /// The key value of the data item being referenced, like the Guid for a page id.
        /// </summary>
        object KeyValue { get; }

        /// <summary>
        /// The data item being referenced.
        /// </summary>
        IData Data { get; }

        /// <exclude />
        string Serialize();
    }
}
