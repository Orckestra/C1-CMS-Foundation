using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [Serializable()]
    public class DataFieldTreeOrderingProfile
    {
        /// <exclude />
        public DataFieldTreeOrderingProfile()
        {
            OrderPriority = null;
            OrderDescending = false;
        }

        /// <exclude />
        public virtual int? OrderPriority { get; set; }

        /// <exclude />
        public virtual bool OrderDescending { get; set; }

        /// <exclude />
        public override string ToString()
        {
            return String.Format("{0},{1}", OrderPriority, OrderDescending);
        }

        /// <exclude />
        public static DataFieldTreeOrderingProfile FromString(string str)
        {
            var parts = str.Split(',');
            int priority;
            bool order;

            DataFieldTreeOrderingProfile treeOrderingProfile = new DataFieldTreeOrderingProfile();

            if (int.TryParse(parts[0], out priority))
                treeOrderingProfile.OrderPriority = priority;

            if (parts.Length > 1 && bool.TryParse(parts[1], out order))
                treeOrderingProfile.OrderDescending = order;

            return treeOrderingProfile;
        }

    }
}
