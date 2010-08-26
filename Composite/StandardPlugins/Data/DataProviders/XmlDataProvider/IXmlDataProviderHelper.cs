using System;
using System.Xml.Linq;

using Composite.Data;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{
    internal interface IXmlDataProviderHelper
    {
        Type _InterfaceType { get; }
        Type _DataIdType { get; }        
        Func<XElement, T> CreateSelectFunction<T>(string providerName) where T : IData;
        IDataId CreateDataId(XElement xElement);
        void ValidateDataType(IData data);        
        T CreateNewElement<T>(IData data, out XElement newElement, string elementName, string providerName) where T : IData;
    }
}