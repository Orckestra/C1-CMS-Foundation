using System.Reflection;
using System;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class IDataIdExtensions
    {
        /// <exclude />
        public static void FullCopyTo(this IDataId sourceDataId, IDataId targetDataId)
        {
            if (sourceDataId == null) throw new ArgumentNullException("sourceDataId");
            if (targetDataId == null) throw new ArgumentNullException("targetDataId");

            foreach (PropertyInfo sourcePropertyInfo in sourceDataId.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                PropertyInfo targetPropertyInfo = targetDataId.GetType().GetProperty(sourcePropertyInfo.Name, BindingFlags.Public | BindingFlags.Instance);

                object value = sourcePropertyInfo.GetValue(sourceDataId, null);

                targetPropertyInfo.SetValue(targetDataId, value, null);
            }
        }



        /// <exclude />
        public static bool CompareTo(this IDataId sourceDataId, IDataId targetDataId)
        {
            return CompareTo(sourceDataId, targetDataId, false);
        }


        /// <exclude />
        public static bool CompareTo(this IDataId sourceDataId, IDataId targetDataId, bool throwExceptionOnTypeMismathc)
        {
            if (sourceDataId == null) throw new ArgumentNullException("sourceDataId");
            if (targetDataId == null) throw new ArgumentNullException("targetDataId");


            if (sourceDataId.GetType() != targetDataId.GetType())
            {
                if (throwExceptionOnTypeMismathc == true) throw new ArgumentException(string.Format("Type mismatch {0} and {1}", sourceDataId.GetType(), targetDataId.GetType()));
                return false;
            }

            bool equal = true;
            foreach (PropertyInfo sourcePropertyInfo in sourceDataId.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                PropertyInfo targetPropertyInfo = targetDataId.GetType().GetProperty(sourcePropertyInfo.Name, BindingFlags.Public | BindingFlags.Instance);

                object sourceValue = sourcePropertyInfo.GetValue(sourceDataId, null);
                object targetValue = targetPropertyInfo.GetValue(targetDataId, null);

                if (object.Equals(sourceValue, targetValue) == false)
                {
                    equal = false;
                    break;
                }
            }

            return equal;
        }
    }
}
