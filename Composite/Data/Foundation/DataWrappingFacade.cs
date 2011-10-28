using System;
using Composite.Data.Foundation.CodeGeneration;

namespace Composite.Data.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class DataWrappingFacade
	{
        /// <exclude />
	    public static T Wrap<T>(T value) where T: class, IData
        {
            if (value is IDataWrapper) return value;

            Type wrapperType = DataWrapperTypeManager.GetDataWrapperType(typeof (T));

            return (T)Activator.CreateInstance(wrapperType, new object[] { value });
        }


        /// <exclude />
        public static T UnWrap<T>(T value) where T: class, IData
        {
            while (value is IDataWrapper)
            {
                var wrappedItem = value as IDataWrapper;
                wrappedItem.CommitData();
                value = (T)wrappedItem.WrappedData;
            }
            return value;
        }
	}
}
