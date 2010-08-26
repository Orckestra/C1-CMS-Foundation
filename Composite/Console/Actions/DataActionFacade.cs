using System;
using System.Collections.Generic;
using System.Linq;
using Composite.C1Console.Actions.Foundation;
using Composite.C1Console.Actions.Foundation.PluginFacades;
using Composite.Data;
using Composite.Core.Linq;



namespace Composite.C1Console.Actions
{
    internal static class DataActionFacade
    {
        public static Dictionary<DataSourceId, List<DataActionSourceId>> GetActions<T>(IQueryable<T> data)
            where T : class, IData
        {
            var dataSourceIds =
                from d in data
                select d.DataSourceId;

            Dictionary<DataSourceId, List<DataActionSourceId>> result = dataSourceIds.ToDictionary(d => d, d => new List<DataActionSourceId>());

            Type dataInterfaceType = data.GetType().GetGenericArguments()[0];

            foreach (string providerName in DataActionProviderPluginRegistry.GetProviderNames())
            {
                AddActionsByType(result, providerName, dataInterfaceType);

                AddActionsByData<T>(result, providerName, data);
            }

            return result;
        }



        private static void AddActionsByType(Dictionary<DataSourceId, List<DataActionSourceId>> result, string providerName, Type dataInterfaceType)
        {
            IEnumerable<IDataActionId> dataActionIdsByType = DataActionProviderPluginFacade.GetActionsByType(providerName, dataInterfaceType);

            List<DataActionSourceId> dataActionSourceIdsByType = dataActionIdsByType.ToList<IDataActionId, DataActionSourceId>(id => new DataActionSourceId(id, providerName));


            foreach (List<DataActionSourceId> actionList in result.Values)
            {
                actionList.AddRange(dataActionSourceIdsByType);
            }
        }



        private static void AddActionsByData<T>(Dictionary<DataSourceId, List<DataActionSourceId>> result, string providerName, IQueryable<T> data)
            where T : class, IData
        {
            Dictionary<DataSourceId, List<IDataActionId>> dataActionIdsByData = DataActionProviderPluginFacade.GetActionsByData<T>(providerName, data);

            if (dataActionIdsByData != null)
            {
                foreach (KeyValuePair<DataSourceId, List<IDataActionId>> kvp in dataActionIdsByData)
                {
                    List<DataActionSourceId> dataActionSourceIds;
                    if (result.TryGetValue(kvp.Key, out dataActionSourceIds) == false)
                    {
                        throw new InvalidOperationException(string.Format("The DataActionProvider {0} returned a DataSourceId that was not a part of the data query", providerName));
                    }

                    List<DataActionSourceId> dataActionSourceIdsByData = kvp.Value.ToList<IDataActionId, DataActionSourceId>(id => new DataActionSourceId(id, providerName));

                    dataActionSourceIds.AddRange(dataActionSourceIdsByData);
                }
            }
        }
    }
}
