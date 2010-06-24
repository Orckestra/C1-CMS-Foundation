using System;
using Composite.ConfigurationSystem;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Data.Plugins.DataProvider.Runtime
{
    internal interface IDataProviderFactory 
    {
        IDataProvider Create(string dataProviderName);
    }

    

    internal sealed class ConfigurationDataProviderFactory : NameTypeFactoryBase<IDataProvider>, IDataProviderFactory
    {
        public ConfigurationDataProviderFactory()
            : base(ConfigurationServices.ConfigurationSource)
        {
        }

        IDataProvider IDataProviderFactory.Create(string dataProviderName)
        {
            return base.Create(dataProviderName);
        }
    }
    
}
