using System;
using System.Collections.Generic;


namespace Composite.Data.Foundation
{
    internal interface IDataProviderRegistry
    {
        string DefaultDynamicTypeDataProviderName { get; }
        IEnumerable<Type> AllInterfaces { get; }
        IEnumerable<Type> AllKnownInterfaces { get; }
        IEnumerable<Type> GeneratedInterfaces { get; }
        IEnumerable<string> DataProviderNames { get; }
        IEnumerable<string> DynamicDataProviderNames { get; }
        List<string> GetDataProviderNamesByInterfaceType(Type interfaceType);
        List<string> GetWriteableDataProviderNamesByInterfaceType(Type interfaceType);

        void AddNewDataType(Type interaceType, string providerName, bool isWritableProvider = true);
        void AddKnownDataType(Type interaceType, string providerName);
        void UnregisterDataType(Type interfaceType, string providerName);
        void RegisterDataTypeInitializationError(Type interfaceType, Exception exception);
        void CheckInitializationErrors(Type interfaceType);
        void InitializeDataTypes();
        void Flush();
    }
}
