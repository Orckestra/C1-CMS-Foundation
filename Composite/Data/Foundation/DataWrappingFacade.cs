using System;
using Composite.Data.Foundation.CodeGeneration;

namespace Composite.Data.Foundation
{
    /// <summary>    
    /// Wraps data object, so changes to the original object won't be applied until the object is saved. Used for wrapping cached data.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class DataWrappingFacade
    {
        /// <exclude />
	    public static T Wrap<T>(T value) where T: class, IData
        {
            if (value is IDataWrapper) return value;

            Type wrapperType = WrapperSingleton<T>.WrapperType;

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

        private static class WrapperSingleton<T>
        {
            private static readonly Type _wrapperType;

            static WrapperSingleton()
            {
                _wrapperType = DataWrapperTypeManager.GetDataWrapperType(typeof(T));
            }

            public static Type WrapperType { get { return _wrapperType; } }
        }
	}
}
