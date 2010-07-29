using System;
using System.Globalization;
using Composite.Data.Foundation.CodeGeneration;


namespace Composite.Data.Plugins.DataProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataProviderContext
    {
        private string _providerName;



        internal DataProviderContext(string providerName)
        {
            if (string.IsNullOrEmpty(providerName) == true) throw new ArgumentNullException("providerName");

            _providerName = providerName;
        }


        public string ProviderName
        {
            get { return _providerName; }
        }



        public DataSourceId CreateDataSourceId(IDataId dataId, Type interfaceType)
        {
            if (dataId == null) throw new ArgumentNullException("dataId");
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (typeof(IData).IsAssignableFrom(interfaceType) == false) throw new ArgumentException(string.Format("The interface type '{0}' does not inherit the interface '{1}'", interfaceType, typeof(IData)));

            return new DataSourceId(dataId, _providerName, interfaceType, DataScopeManager.MapByType(interfaceType), LocalizationScopeManager.MapByType(interfaceType));
        }

        internal DataSourceId CreateDataSourceId(IDataId dataId, Type interfaceType, DataScopeIdentifier dataScopeIdentifier, CultureInfo cultureInfo)
        {
            if (dataId == null) throw new ArgumentNullException("dataId");
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (dataScopeIdentifier == null) throw new ArgumentNullException("dataScopeIdentifier");
            if (cultureInfo == null) throw new ArgumentNullException("cultureInfo");
            if (!typeof(IData).IsAssignableFrom(interfaceType)) throw new ArgumentException(string.Format("The interface type '{0}' does not inherit the interface '{1}'", interfaceType, typeof(IData)));

            return new DataSourceId(dataId, _providerName, interfaceType, dataScopeIdentifier, cultureInfo);
        }


        
        public void UpdateDataSourceId(IData data, IDataId dataId, Type interfaceType)
        {
            if (data == null) throw new ArgumentNullException("data");
            if (dataId == null) throw new ArgumentNullException("dataId");
            if (interfaceType == null) throw new ArgumentNullException("interfaceType");
            if (typeof(IData).IsAssignableFrom(interfaceType) == false) throw new ArgumentException(string.Format("The interface type '{0}' does not inherit the interface '{1}'", interfaceType, typeof(IData)));

            EmptyDataClassBase emptyDataClassBase = data as EmptyDataClassBase;
            if (emptyDataClassBase == null)
            {
                throw new InvalidOperationException("Updates on DataSourceIds can only be done on objects that are returned by the DataFacade.BuildNew<T>() method");
            }

            if (emptyDataClassBase.DataSourceId.ExistsInStore == true)
            {
                throw new InvalidOperationException("Updates on DataSourceIds can only be done once");
            }

            emptyDataClassBase.DataSourceId = CreateDataSourceId(dataId, interfaceType);
        }



        public void UpdateDataSourceIdDataScope(IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            data.DataSourceId.DataScopeIdentifier = DataScopeManager.MapByType(data);
        }
    }
}
