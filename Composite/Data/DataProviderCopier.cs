using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Transactions;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.Logging;
using Composite.Core.Types;
using Composite.Data.DynamicTypes;
using Composite.Data.Foundation;
using Composite.Data.Foundation.PluginFacades;
using Composite.Data.Plugins.DataProvider;
using Composite.Data.ProcessControlled;
using Composite.Data.Transactions;


namespace Composite.Data
{
    /// <summary>
    /// Class used for copying data from one data provider to another
    /// </summary>
    public sealed class DataProviderCopier
    {
        private delegate void HandleSpecialTypeDelegate(List<IData> datas, string sourceProviderName, string targetProviderName);
        private static readonly string LogTitle = "Database copying";
        private static readonly Dictionary<Type, HandleSpecialTypeDelegate> _specialHandleInterfaces = new Dictionary<Type, HandleSpecialTypeDelegate>();


        /// <summary>
        /// Initializes a new instance of the <see cref="DataProviderCopier"/> class.
        /// </summary>
        /// <param name="sourceProviderName">Name of the source data provider.</param>
        /// <param name="targetProviderName">Name of the target data provider.</param>
        public DataProviderCopier(string sourceProviderName, string targetProviderName)
        {
            this.SourceProviderName = sourceProviderName;
            this.TargetProviderName = targetProviderName;

            UseTransaction = true;
            IgnorePrimaryKeyViolation = true;
        }


        /// <summary>
        /// Gets the name of the source data provider.
        /// </summary>
        /// <value>
        /// The name of the source data provider.
        /// </value>
        public string SourceProviderName { get; private set; }

        /// <summary>
        /// Gets the name of the target data provider.
        /// </summary>
        /// <value>
        /// The name of the target data provider.
        /// </value>
        public string TargetProviderName { get; private set; }


        /// <summary>
        /// Gets or sets a value indicating whether transaction should be used.
        /// Disabling transaction may help to ignore transaction timeout limitation which is limited to 20 minutes in machine.config
        /// </summary>
        /// <value>
        ///   <c>true</c> if transaction should be used; otherwise, <c>false</c>.
        /// </value>
        public bool UseTransaction { get; set; }

        /// <summary>
        /// If set to <c>true</c>, records with already used primary keys will be skipped and the copying process will continue.
        /// </summary>
        /// <value>
        /// 	<c>true</c> if [ignore primary key violation]; otherwise, <c>false</c>.
        /// </value>
        public bool IgnorePrimaryKeyViolation { get; set; }

        /// <summary>
        /// Copies all the types that the query returns.
        /// </summary>
        public void Copy(IEnumerable<Type> queryToTypes)
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

                        Log.LogVerbose(LogTitle, "Full copy started");

                        IEnumerable<Type> allInterfacesToEnsure = queryToTypes.ToList();

                        Log.LogVerbose(LogTitle, "Ensuring interfaces...");
                        EnsureInterfaces(allInterfacesToEnsure);

                        Log.LogVerbose(LogTitle, "Done insuring interfaces!");

                        IEnumerable<Type> allInterfaces = queryToTypes.ToList();

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

                    Log.LogVerbose(LogTitle, "Full copy done!");
                }
            }
        }
        /// <summary>
        /// Copies all the data from the source data provider to the target data provider.
        /// </summary>
        public void FullCopy()
        {
            var allTypes =  from type in DataFacade.GetAllInterfaces()
                            where DataProviderRegistry.GetDataProviderNamesByInterfaceType(type).Contains(this.SourceProviderName)
                            select type;
            Copy(allTypes);
        }



        private void EnsureInterfaces(IEnumerable<Type> allInterfaces)
        {
            var dataTypeDescriptors = new List<DataTypeDescriptor>();

            foreach (Type interfaceType in allInterfaces)
            {
                if (!DataProviderRegistry.GetDataProviderNamesByInterfaceType(interfaceType).Contains(this.TargetProviderName))
                {
                    var dataTypeDescriptor = DynamicTypeManager.BuildNewDataTypeDescriptor(interfaceType);

                    dataTypeDescriptor.Validate();

                    dataTypeDescriptors.Add(dataTypeDescriptor);
                }
            }

            DataProviderPluginFacade.CreateStores(this.TargetProviderName, dataTypeDescriptors);
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
                Log.LogVerbose(LogTitle, "Copying scope '{0}' data for type '{1}'".FormatWith(dataScopeIdentifier.Name, interfaceType.FullName));

                foreach (CultureInfo cultureInfo in GetSupportedCultures(interfaceType))
                {
                    using (new DataScope(dataScopeIdentifier, cultureInfo))
                    {
                        List<IData> dataset;
                        try
                        {
                            dataset = DataFacade.GetData(interfaceType, SourceProviderName).ToDataList();

                            if (_specialHandleInterfaces.ContainsKey(interfaceType))
                            {
                                _specialHandleInterfaces[interfaceType](dataset, this.SourceProviderName,
                                                                        this.TargetProviderName);
                            }
                        }
                        catch (Exception)
                        {
                            Log.LogCritical(LogTitle,"Failed to read data from type '{0}'. See the log for the details."
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
                        catch (Exception e)
                        {
                            Log.LogError(LogTitle, $"Adding failed while adding {interfaceType.Namespace}.{interfaceType.Name} because {e.Message}");
                            Log.LogError(LogTitle,e.InnerException);
                            throw;
                        }
                    }

                }
            }
        }

        private static void AddData(Type type, IEnumerable<IData> dataset, IWritableDataProvider dataProvider)
        {
            // TODO: check if adding in groups of ~1000 records may improve the performance
            MethodInfo genericMethod = StaticReflection.GetGenericMethodInfo((a) => AddData<IData>(null, null)); 
            genericMethod.MakeGenericMethod(new[] { type }).Invoke(null, new object[] { dataset, dataProvider });
        }

        private static void AddData<T>(IEnumerable<IData> dataset, IWritableDataProvider dataProvider) where T : class, IData
        {
            dataProvider.AddNew(dataset.Cast<T>());
        }

        private static void FixData(IData data)
        {
            if (data is ILocalizedControlled)
            {
                var localizedData = data as ILocalizedControlled;

                if (localizedData.SourceCultureName == null)
                {
                    localizedData.SourceCultureName = LocalizationScopeManager.CurrentLocalizationScope.Name;
                }
            }
        }
    }
}
