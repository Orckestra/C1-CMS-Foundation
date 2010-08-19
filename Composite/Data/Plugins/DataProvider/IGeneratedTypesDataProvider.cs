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
        IEnumerable<Type> GetGeneratedInterfaces();
	}
}
