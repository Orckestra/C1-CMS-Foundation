using System;
using System.Linq;
using System.Collections.Generic;

using Composite.Actions.Plugins.DataActionProvider.Runtime;

using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.Data;


namespace Composite.Actions.Plugins.DataActionProvider
{
    [CustomFactory(typeof(DataActionProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(DataActionProviderDefaultNameRetriever))]
    internal interface IDataActionProvider
    {
        /// <summary>
        /// This property will be called by the system. 
        /// The provider can use the DataActionProviderContext for creating DataActionSourceId's
        /// </summary>
        DataActionProviderContext Context { set; }

        IDataAction GetAction(IDataActionId dataActionId);
        IEnumerable<IDataActionId> GetActionsByType(Type dataInterfaceType);
        Dictionary<DataSourceId, List<IDataActionId>> GetActionsByData<T>(IQueryable<T> data) where T : class, IData;
    }
}
