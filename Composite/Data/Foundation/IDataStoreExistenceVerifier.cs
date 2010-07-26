using System.Collections.Generic;
using System;
namespace Composite.Data.Foundation
{
	internal interface IDataStoreExistenceVerifier
	{
        IEnumerable<Type> InterfaceTypes { get; }

        /// <summary>
        /// Return true if any types was "created"
        /// </summary>
        /// <returns></returns>
        bool EnsureDataStores();
	}
}
