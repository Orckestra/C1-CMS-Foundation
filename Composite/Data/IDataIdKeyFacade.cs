using System;


namespace Composite.Data
{
    internal interface IDataIdKeyFacade
    {
        object GetKeyValue(IDataId dataId, string keyName);
        string GetDefaultKeyName(Type dataIdType);
        void OnFlush();
    }
}
