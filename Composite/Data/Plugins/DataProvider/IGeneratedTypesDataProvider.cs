using System;
using System.Collections.Generic;


namespace Composite.Data.Plugins.DataProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IGeneratedTypesDataProvider : IDataProvider, IDynamicDataProvider, IWritableDataProvider
	{
        /// <summary>
        /// This method should return all genereted data interface types that the provider supports,
        /// and nothing more.
        /// </summary>
        /// <returns></returns>
        IEnumerable<Type> GetGeneratedInterfaces();
	}
}
