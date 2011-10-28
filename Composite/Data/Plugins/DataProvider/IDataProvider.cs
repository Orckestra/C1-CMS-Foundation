using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data.Plugins.DataProvider.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Data.Plugins.DataProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [CustomFactory(typeof(DataProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(DataProviderDefaultNameRetriever))]
    public interface IDataProvider
    {
        /// <summary>
        /// This is set by the system and is used to create DataSourceId's
        /// </summary>
        DataProviderContext Context { set; }

        /// <summary>
        /// This method should return all supported data interfaces. 
        /// That is, all data interfaces that this provider is currently handling.
        /// </summary>
        /// <returns></returns>
        IEnumerable<Type> GetSupportedInterfaces();

        /// <exclude />
        IQueryable<T> GetData<T>() where T : class, IData;

        /// <summary>
        /// This method should return null if the given dataId does not correspond to an IData
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dataId"></param>
        /// <returns></returns>
        T GetData<T>(IDataId dataId) where T : class, IData;
    }
}
