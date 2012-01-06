using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Transactions;
using Composite.Core.Extensions;
using Composite.Core.Logging;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.Foundation.PluginFacades;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.ProcessControlled;
using Composite.Data.Transactions;


namespace Composite.Data
{
    internal sealed class DataProviderCopier
    {
        private delegate void HandleSpecialTypeDelegate(List<IData> datas, string sourceProviderName, string targetProviderName);
        private static readonly string LogTitle = "Database copying";
        private static readonly Dictionary<Type, HandleSpecialTypeDelegate> _specialHandleInterfaces = new Dictionary<Type, HandleSpecialTypeDelegate>();


        public DataProviderCopier(string sourceProviderName, string targetProviderName)
        {
            this.SourceProviderName = sourceProviderName;
            this.TargetProviderName = targetProviderName;

            UseTransaction = true;
            IgnorePrimaryKeyViolation = true;
        }


        public string SourceProviderName { get; private set; }
        public string TargetProviderName { get; private set; }
        public bool UseTransaction { get; set; }
        public bool IgnorePrimaryKeyViolation { get; set; }


        public void FullCopy()
        {
            using (GlobalInitializerFacade.CoreIsInitializedScope)
            {
                using (GlobalInitializerFacade.CoreLockScope)
                {
                    TransactionScope transactionScope = null;
                    try
                    {
                        if (UseTransaction)
                        {
                            transactionScope = TransactionsFacade.CreateNewScope(TimeSpan.FromHours(6.0));
                        }

                        LoggingService.LogVerbose(LogTitle, "Full copy started");

                        IEnumerable<Type> allInterfacesToEnsure =
                            (from type in DataFacade.GetAllInterfaces()
                             where DataProviderRegistry.GetDataProviderNamesByInterfaceType(type).Contains(this.SourceProviderName) == true
                             select type).ToList();

                        LoggingService.LogVerbose(LogTitle, "Ensuring interfaces...");
                        EnsureInterfaces(allInterfacesToEnsure);

                        LoggingService.LogVerbose(LogTitle, "Done insuring interfaces!");

                        IEnumerable<Type> allInterfaces =
                                (from type in DataFacade.GetAllInterfaces()
                                 where DataProviderRegistry.GetDataProviderNamesByInterfaceType(type).Contains(this.SourceProviderName) == true
                                 select type).ToList();

                        List<Type> handleLastInterfaceTypes = new List<Type>();

                        foreach (Type interfaceType in allInterfaces)
                        {
                            if (_specialHandleInterfaces.ContainsKey(interfaceType) == false)
                            {
                                CopyData(interfaceType);
                            }
                            else
                            {
                                handleLastInterfaceTypes.Add(interfaceType);
                            }
                        }

                        foreach (Type interfaceType in handleLastInterfaceTypes)
                        {
                            CopyData(interfaceType);
                        }

                        if (transactionScope != null)
                        {
                            transactionScope.Complete();
                        }
                    }
                    finally
                    {
                        if (transactionScope != null)
                        {
                            transactionScope.Dispose();
                        }
                    }

                    LoggingService.LogVerbose(LogTitle, "Full copy done!");
                }
            }
        }



        private void EnsureInterfaces(IEnumerable<Type> allInterfaces)
        {
            foreach (Type interfaceType in allInterfaces)
            {
                if (DataProviderRegistry.GetDataProviderNamesByInterfaceType(interfaceType).Contains(this.TargetProviderName) == false)
                {
                    DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(interfaceType);

                    dataTypeDescriptor.Validate();

                    DataProviderPluginFacade.CreateStore(this.TargetProviderName, dataTypeDescriptor);
                }
            }
        }



        private CultureInfo[] GetSupportedCultures(Type interfaceType)
        {
            if (DataLocalizationFacade.IsLocalized(interfaceType))
            {
                return DataLocalizationFacade.ActiveLocalizationCultures.ToArray();
            }
            return new[] { CultureInfo.InvariantCulture };
        }



        private void CopyData(Type interfaceType)
        {
            IWritableDataProvider targetDataProvider = DataProviderPluginFacade.GetDataProvider(TargetProviderName) as IWritableDataProvider;
            Verify.IsNotNull(targetDataProvider, "Failed to get target data provider, probably it's not writeable.");

            foreach (DataScopeIdentifier dataScopeIdentifier in interfaceType.GetSupportedDataScopes())
            {
                LoggingService.LogVerbose(LogTitle, "Copying scope '{0}' data for type '{1}'".FormatWith(dataScopeIdentifier.Name, interfaceType.FullName));

                foreach (CultureInfo cultureInfo in GetSupportedCultures(interfaceType))
                {
                    using (new DataScope(dataScopeIdentifier, cultureInfo))
                    {
                        List<IData> dataset;
                        try
                        {
                            dataset = DataFacade.GetData(interfaceType, SourceProviderName).ToDataList();

                            if (_specialHandleInterfaces.ContainsKey(interfaceType) == true)
                            {
                                _specialHandleInterfaces[interfaceType](dataset, this.SourceProviderName,
                                                                        this.TargetProviderName);
                            }
                        }
                        catch (Exception)
                        {
                            LoggingService.LogCritical(LogTitle,
                                                       "Failed to read data from type '{0}'. See the log for the details."
                                                           .FormatWith(interfaceType.FullName));
                            throw;
                        }


                        List<IData> filteredDataset = null;
                        HashSet<string> dataIDs = null;

                        if (IgnorePrimaryKeyViolation)
                        {
                            filteredDataset = new List<IData>();
                            dataIDs = new HashSet<string>();
                        }

                        foreach (var data in dataset)
                        {
                            if (IgnorePrimaryKeyViolation)
                            {
                                string dataId = data.DataSourceId.ToString();
                                if (dataIDs.Contains(dataId))
                                {
                                    LoggingService.LogWarning(LogTitle, "Cannot insert a data row, since it's data ID is already used. DataID: '{0}'".FormatWith(dataId));
                                    continue;
                                }
                                dataIDs.Add(dataId);

                                filteredDataset.Add(data);
                            }
                            FixData(data);
                        }

                        if (IgnorePrimaryKeyViolation)
                        {
                            dataIDs = null;
                            dataset = filteredDataset;
                        }

                        try
                        {
                            AddData(interfaceType, dataset, targetDataProvider);
                        }
                        catch (Exception)
                        {
                            LoggingService.LogWarning("Database copying", "Adding failed.");
                            throw;
                        }
                    }

                }
            }
        }

        private static void AddData(Type type, IEnumerable<IData> dataset, IWritableDataProvider dataProvider)
        {
            MethodInfo genericMethod = typeof(DataProviderCopier).GetMethod("AddData1", BindingFlags.Static | BindingFlags.NonPublic);
            genericMethod.MakeGenericMethod(new[] { type }).Invoke(null, new object[] { dataset, dataProvider });
        }

        /// <summary>
        /// To be called through reflection.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dataset"></param>
        /// <param name="dataProvider"></param>
        private static void AddData1<T>(IEnumerable<IData> dataset, IWritableDataProvider dataProvider) where T : class, IData
        {
            dataProvider.AddNew(dataset.Cast<T>());
        }

        private static void FixData(IData data)
        {
            if (data is ILocalizedControlled)
            {
                var localizedData = data as ILocalizedControlled;
                if (localizedData.CultureName == null)
                {
                    localizedData.CultureName = LocalizationScopeManager.CurrentLocalizationScope.Name;
                }

                if (localizedData.SourceCultureName == null)
                {
                    localizedData.SourceCultureName = LocalizationScopeManager.CurrentLocalizationScope.Name;
                }
            }
        }
    }
}
