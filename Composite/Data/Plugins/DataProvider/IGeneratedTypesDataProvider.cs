using System;
using System.Collections.Generic;


namespace Composite.Data.Plugins.DataProvider
{
    public interface IGeneratedTypesDataProvider : IDataProvider, IDynamicDataProvider, IWritableDataProvider
	{
        IEnumerable<Type> GetGeneratedInterfaces();
	}
}
