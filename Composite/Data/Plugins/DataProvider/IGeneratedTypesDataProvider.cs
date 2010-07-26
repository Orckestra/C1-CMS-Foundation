using System;
using System.Collections.Generic;


namespace Composite.Data.Plugins.DataProvider
{
    internal interface IGeneratedTypesDataProvider : IDataProvider, IDynamicDataProvider, IWritableDataProvider
	{
        IEnumerable<Type> GetGeneratedInterfaces();
	}
}
