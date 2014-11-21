using System;
using System.Globalization;
using Composite.Core.Extensions;
using Composite.Data.Foundation.CodeGeneration;


namespace Composite.Data.Plugins.DataProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataProviderContext
    {
        private readonly string _providerName;

        /// <exclude />
        public DataProviderContext(string providerName)
        {
            Verify.ArgumentNotNullOrEmpty(providerName, "providerName");

            _providerName = providerName;
        }



        /// <exclude />
        public string ProviderName
        {
            get { return _providerName; }
        }



        /// <exclude />
        public DataSourceId CreateDataSourceId(IDataId dataId, Type interfaceType)
        {
            Verify.ArgumentNotNull(dataId, "dataId");
            Verify.ArgumentNotNull(interfaceType, "interfaceType");
            Verify.ArgumentCondition(typeof(IData).IsAssignableFrom(interfaceType), "interfaceType", "The interface type '{0}' does not inherit the interface '{1}'".FormatWith(interfaceType, typeof(IData)));

            return new DataSourceId(dataId, _providerName, interfaceType, DataScopeManager.MapByType(interfaceType), LocalizationScopeManager.MapByType(interfaceType));
        }

        /// <exclude />
        public DataSourceId CreateDataSourceId(IDataId dataId, Type interfaceType, DataScopeIdentifier dataScopeIdentifier, CultureInfo cultureInfo)
        {
            Verify.ArgumentNotNull(dataId, "dataId");
            Verify.ArgumentNotNull(interfaceType, "interfaceType");
            Verify.ArgumentNotNull(dataScopeIdentifier, "dataScopeIdentifier");
            Verify.ArgumentNotNull(cultureInfo, "cultureInfo");
            Verify.ArgumentCondition(typeof(IData).IsAssignableFrom(interfaceType), "interfaceType", "The interface type '{0}' does not inherit the interface '{1}'".FormatWith(interfaceType, typeof(IData)));

            return new DataSourceId(dataId, _providerName, interfaceType, dataScopeIdentifier, cultureInfo);
        }



        /// <exclude />
        public void UpdateDataSourceId(IData data, IDataId dataId, Type interfaceType)
        {
            Verify.ArgumentNotNull(data, "data");
            Verify.ArgumentNotNull(dataId, "dataId");
            Verify.ArgumentNotNull(interfaceType, "interfaceType");
            Verify.ArgumentCondition(typeof(IData).IsAssignableFrom(interfaceType), "interfaceType", "The interface type '{0}' does not inherit the interface '{1}'".FormatWith(interfaceType, typeof(IData)));

            var emptyDataClassBase = data as EmptyDataClassBase;
            if (emptyDataClassBase == null)
            {
                throw new InvalidOperationException("Updates on DataSourceIds can only be done on objects that are returned by the DataFacade.BuildNew<T>() method");
            }

            if (emptyDataClassBase.DataSourceId.ExistsInStore)
            {
                throw new InvalidOperationException("Updates on DataSourceIds can only be done once");
            }

            emptyDataClassBase.DataSourceId = CreateDataSourceId(dataId, interfaceType);
        }



        /// <exclude />
        public void UpdateDataSourceIdDataScope(IData data)
        {
            Verify.ArgumentNotNull(data, "data");

            data.DataSourceId.DataScopeIdentifier = DataScopeManager.MapByType(data);
        }
    }
}
