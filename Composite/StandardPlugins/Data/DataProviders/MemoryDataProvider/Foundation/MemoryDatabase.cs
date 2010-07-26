using Composite.Data;
using System;
using System.Collections.Generic;
using Composite.Data.Plugins.DataProvider;
using System.Linq;


namespace Composite.StandardPlugins.Data.DataProviders.MemoryDataProvider.Foundation
{
    internal sealed class MemoryDatabase
    {
        private Dictionary<Type, Dictionary<string, Dictionary<IMemoryEntityKey, IData>>> _database = new Dictionary<Type, Dictionary<string, Dictionary<IMemoryEntityKey, IData>>>();
        private Dictionary<Type, MemoryEntityData> _memoryEntityDatas = new Dictionary<Type, MemoryEntityData>();


        public IQueryable<T> GetData<T>()
            where T : class, IData
        {
            Dictionary<IMemoryEntityKey, IData> dictionary = GetDictionary(typeof(T));

            List<T> result = new List<T>();
            foreach (IData data in dictionary.Values)
            {
                result.Add((T)data);
            }

            return result.AsQueryable();
        }



        public T GetData<T>(IDataId dataId)
            where T : class, IData
        {
            MemoryEntityData memoryEntityData = GetMemoryEntityData(typeof(T));

            IMemoryEntityKey key = memoryEntityData.CreateKey(dataId);

            Dictionary<IMemoryEntityKey, IData> dictionary = GetDictionary(typeof(T));

            IData data;
            if (dictionary.TryGetValue(key, out data) == false)
            {
                throw new ArgumentException("No data exist for the given dataId");
            }

            return (T)data;
        }



        public IData AddNew(Type interfaceType, IData data, DataProviderContext dataProviderContext)
        {
            MemoryEntityData memoryEntityData = GetMemoryEntityData(interfaceType);

            IData wrapper = (IData)memoryEntityData.CreateWrapper(data, dataProviderContext);

            IMemoryEntityKey key = memoryEntityData.CreateKey(wrapper);

            Dictionary<IMemoryEntityKey, IData> dictionary = GetDictionary(interfaceType);

            if (dictionary.ContainsKey(key) == true)
            {
                throw new InvalidOperationException("Data with the same key has already been added"); 
            }

            dictionary.Add(key, wrapper);

            return wrapper;
        }



        public void Update(Type interfaceType, IData data)
        {
            MemoryEntityData memoryEntityData = GetMemoryEntityData(interfaceType);

            IEntityWrapper wrapper = data as IEntityWrapper;
            if (data == null) throw new ArgumentException("data is not from this provider");

            IMemoryEntityKey key = memoryEntityData.CreateKey((IData)wrapper);

            Dictionary<IMemoryEntityKey, IData> dictionary = GetDictionary(interfaceType);

            if (dictionary.ContainsKey(key) == false)
            {
                throw new InvalidOperationException("No dataata with the key has been added");
            }

            wrapper.CommitData();
        }



        public void Delete(Type interfaceType, IDataId dataId)
        {
            MemoryEntityData memoryEntityData = GetMemoryEntityData(interfaceType);

            IMemoryEntityKey key = memoryEntityData.CreateKey(dataId);

            Dictionary<IMemoryEntityKey, IData> dictionary = GetDictionary(interfaceType);

            if (dictionary.ContainsKey(key) == false)
            {
                throw new InvalidOperationException("No dataata with the key has been added");
            }

            dictionary.Remove(key);
        }



        public void AddInterfaceType(MemoryEntityData memoryEntityData)
        {
            Dictionary<string, Dictionary<IMemoryEntityKey, IData>> stores;
            if (_database.TryGetValue(memoryEntityData.InterfaceType, out stores) == false)
            {
                stores = new Dictionary<string, Dictionary<IMemoryEntityKey, IData>>();
                _database.Add(memoryEntityData.InterfaceType, stores);
            }
            else
            {
                throw new InvalidOperationException(string.Format("The interface type '{0}' has already been added", memoryEntityData.InterfaceType));
            }

            foreach (string dataScope in memoryEntityData.DataScopes)
            {
                stores.Add(dataScope, new Dictionary<IMemoryEntityKey, IData>());
            }

            _memoryEntityDatas.Add(memoryEntityData.InterfaceType, memoryEntityData);
        }



        private Dictionary<IMemoryEntityKey, IData> GetDictionary(Type interfaceType)
        {
            Dictionary<string, Dictionary<IMemoryEntityKey, IData>> stores;
            if (_database.TryGetValue(interfaceType, out stores) == false)
            {
                throw new InvalidOperationException(string.Format("The interface type '{0}' is not supported", interfaceType));
            }

            DataScopeIdentifier dataScopeIdentifier = DataScopeManager.MapByType(interfaceType);

            Dictionary<IMemoryEntityKey, IData> datas;
            if (stores.TryGetValue(dataScopeIdentifier.Name, out datas) == false)
            {
                throw new InvalidOperationException(string.Format("The data scope '{0}' is not supported", dataScopeIdentifier));
            }

            return datas;
        }



        private MemoryEntityData GetMemoryEntityData(Type interfaceType)
        {
            MemoryEntityData memoryEntityData;

            if (_memoryEntityDatas.TryGetValue(interfaceType, out memoryEntityData) == false)
            {
                throw new InvalidOperationException(string.Format("The interface type '{0}' is not supported", interfaceType));
            }

            return memoryEntityData;
        }
    }
}
