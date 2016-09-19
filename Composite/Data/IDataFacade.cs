using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Data.Types;


namespace Composite.Data
{

    internal interface IDataFacade
    {
        void SetDataInterceptor<T>(DataInterceptor dataInterceptor) where T : class, IData;
        bool HasDataInterceptor<T>() where T : class, IData;
        void ClearDataInterceptor<T>() where T : class, IData;
        IEnumerable<DataInterceptor> GetDataInterceptors(Type interfaceType);


        IQueryable<T> GetData<T>(bool useCaching, IEnumerable<string> providerNames) where T : class, IData;
        T GetDataFromDataSourceId<T>(DataSourceId dataSourceId, bool useCaching) where T : class, IData;


        void Update(IEnumerable<IData> datas, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performeValidation);

        /// <summary>
        /// This method will add the given data.
        /// This method will also create a store if no data provider supports the given data interface T
        /// and allowStoreCreation is true.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="datas"></param>
        /// <param name="allowStoreCreation"></param>
        /// <param name="suppressEventing"></param>
        /// <param name="performForeignKeyIntegrityCheck"></param>
        /// <param name="performeValidation"></param>
        /// <param name="writeableProviders">null is allowed</param>
        /// <returns></returns>
        List<T> AddNew<T>(IEnumerable<T> datas, bool allowStoreCreation, bool suppressEventing, bool performForeignKeyIntegrityCheck, bool performeValidation, List<string> writeableProviders) where T : class, IData;

        void Delete<T>(IEnumerable<T> datas, bool suppressEventing, CascadeDeleteType cascadeDeleteType, bool referencesFromAllScopes) where T : class, IData;

        T BuildNew<T>(bool suppressEventing) where T : class, IData;
        IData BuildNew(Type interfaceType, bool suppressEventling);

        bool ExistsInAnyLocale<T>(IEnumerable<CultureInfo> excludedCultureInfoes) where T : class, IData;


        /// <summary>
        /// See <see cref="Composite.Data.Plugins.DataProvider.IFileSystemDataProvider"/>
        /// </summary>
        /// <typeparam name="TFile"></typeparam>
        /// <param name="file"></param>
        /// <param name="providerName"></param>
        /// <param name="errorMessage"></param>
        /// <returns></returns>
        bool ValidatePath<TFile>(TFile file, string providerName, out string errorMessage) where TFile : IFile;

        void SetGlobalDataInterceptor<T>(DataInterceptor dataInterceptor) where T : class, IData;
        bool HasGlobalDataInterceptor<T>() where T : class, IData;
        void ClearGlobalDataInterceptor<T>() where T : class, IData;
    }
}
