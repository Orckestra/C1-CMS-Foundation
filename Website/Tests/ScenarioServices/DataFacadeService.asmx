<%@ WebService Language="C#" Class="DataFacadeService" %>

using System;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Collections.Generic;
using System.Xml.Linq;
using System.Reflection;

using Composite.Data;
using Composite.Types;
using Composite.Data.DynamicTypes;
using Composite.Security;
using Composite.Linq;


[WebService(Namespace = "http://www.composite.net/ns/test")]
[SoapDocumentService(RoutingStyle = SoapServiceRoutingStyle.RequestElement)]
public class DataFacadeService : WebService
{
    [WebMethod]
    public string GetData(string typeManagerTypeName)
    {
        return GetDataInScope(typeManagerTypeName, DataScopeIdentifier.AdministratedName);
    }
    
    
    [WebMethod]
    public string GetDataInScope(string typeManagerTypeName, string dataScopeName)
    {
        UserValidationFacade.FormValidateUser("admin", "123456");

        DataScopeIdentifier dataScopeIdentifier = DataScopeIdentifier.Deserialize(dataScopeName);

        using (new DataScope(dataScopeIdentifier))
        {
            Type type = TypeManager.GetType(typeManagerTypeName);

            XElement rootElement = new XElement("Datas");

            IEnumerable<IData> datas = DataFacade.GetData(type).ToDataEnumerable();
            foreach (IData data in datas)
            {
                XElement element = SerializeData(type, data);
                rootElement.Add(element);
            }

            return rootElement.ToString();
        }
    }


    [WebMethod]
    public string GetDataByProperyValue(string typeManagerTypeName, string propertyName, string propertyValue)
    {
        return GetDataByProperyValueInScope(typeManagerTypeName, propertyName, propertyValue, DataScopeIdentifier.AdministratedName);
    }

    

    [WebMethod]
    public string GetDataByProperyValueInScope(string typeManagerTypeName, string propertyName, string propertyValue, string dataScopeName)
    {
        UserValidationFacade.FormValidateUser("admin", "123456");

        DataScopeIdentifier dataScopeIdentifier = DataScopeIdentifier.Deserialize(dataScopeName);

        using (new DataScope(dataScopeIdentifier))
        {
            Type type = TypeManager.GetType(typeManagerTypeName);

            ExpressionBuilder expressionBuilder = new ExpressionBuilder(type, DataFacade.GetData(type));
            
            PropertyInfoValueCollection propertyInfoValueCollection = new PropertyInfoValueCollection();
            PropertyInfo propertyInfo = type.GetPropertiesRecursively().Where(f => f.Name == propertyName).Single();
            propertyInfoValueCollection.AddPropertyValue(propertyInfo, ValueTypeConverter.Convert(propertyValue, propertyInfo.PropertyType));
            expressionBuilder.Where(propertyInfoValueCollection);
            
            XElement rootElement = new XElement("Datas");
            
            IEnumerable<IData> datas = expressionBuilder.CreateQuery().ToDataEnumerable();
            foreach (IData data in datas)
            {
                XElement element = SerializeData(type, data);
                rootElement.Add(element);
            }

            return rootElement.ToString();
        }
    }
    

    
    [WebMethod]
    public int Count(string typeManagerTypeName)
    {
        return CountInScope(typeManagerTypeName, DataScopeIdentifier.AdministratedName);
            
    }
    
    

    [WebMethod]
    public int CountInScope(string typeManagerTypeName, string dataScopeName)
    {
        UserValidationFacade.FormValidateUser("admin", "123456");

        DataScopeIdentifier dataScopeIdentifier = DataScopeIdentifier.Deserialize(dataScopeName);

        using (new DataScope(dataScopeIdentifier))
        {
            Type type = TypeManager.GetType(typeManagerTypeName);

            return DataFacade.GetData(type).ToDataEnumerable().Count();
        }
    }

    

    private XElement SerializeData(Type type, IData data)
    {
        XElement element = new XElement("Data");
        
        DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(type);
        foreach (DataFieldDescriptor dataFieldDescriptor in dataTypeDescriptor.Fields)
        {
            PropertyInfo propertyInfo = type.GetPropertiesRecursively().Where(f => f.Name == dataFieldDescriptor.Name).Single();
            
            object value = propertyInfo.GetValue(data, null);

            if (value != null)
            {
                string serializedValue = Composite.Types.ValueTypeConverter.Convert<string>(value);

                element.Add(new XAttribute(dataFieldDescriptor.Name, serializedValue));
            }
        }

        return element;
    }
}