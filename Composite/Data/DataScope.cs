using System;
using System.Globalization;


namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class DataScope : IDisposable
    {
        private readonly bool _dataScopePushed;
        private readonly bool _cultureInfoPushed;
        private bool _dataServicePushed;
        private bool _disposed;
        private bool _servicesDisabled;

        /// <exclude />
        public void AddService(object service)
        {
            if (!_dataServicePushed)
            {
                DataServiceScopeManager.PushDataServiceScope();
                _dataServicePushed = true;
            }
            DataServiceScopeManager.AddService(service);
        }

        /// <exclude />
        public void AddDefaultService(object service)
        {
            DataServiceScopeManager.AddDefaultService(service);
        }

        /// <exclude />
        public DataScope(DataScopeIdentifier dataScope)
            : this(dataScope, null)
        {
        }

        /// <exclude />
        public DataScope(PublicationScope publicationScope)
            : this(DataScopeIdentifier.FromPublicationScope(publicationScope), null)
        {
        }


        /// <exclude />
        public DataScope(CultureInfo cultureInfo)
        {
            if (cultureInfo != null)
            {
                LocalizationScopeManager.PushLocalizationScope(cultureInfo);
                _cultureInfoPushed = true;
            }
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="dataScope"></param>
        /// <param name="cultureInfo">null for default culture</param>
        public DataScope(DataScopeIdentifier dataScope, CultureInfo cultureInfo)
        {
            DataScopeManager.PushDataScope(dataScope);
            _dataScopePushed = true;


            if (cultureInfo != null)
            {
                LocalizationScopeManager.PushLocalizationScope(cultureInfo);
                _cultureInfoPushed = true;
            }
            else if (LocalizationScopeManager.IsEmpty)
            {
                LocalizationScopeManager.PushLocalizationScope(DataLocalizationFacade.DefaultLocalizationCulture);
                _cultureInfoPushed = true;
            }
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="publicationScope">Publication scope</param>
        /// <param name="cultureInfo">null for default culture</param>
        public DataScope(PublicationScope publicationScope, CultureInfo cultureInfo)
            : this(DataScopeIdentifier.FromPublicationScope(publicationScope), cultureInfo)
        {
        }

        /// <exclude />
        ~DataScope()
        {
            Dispose(false);
        }

        /// <exclude />
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        void Dispose(bool disposing)
        {
            if (!disposing)
            {
                return;
            }

            if (_disposed)
            {
                throw new ObjectDisposedException(nameof(DataScope));
            }

            if (_servicesDisabled)
            {
                EnableServices();
            }

            if (_dataScopePushed)
            {
                DataScopeManager.PopDataScope();
            }

            if (_cultureInfoPushed)
            {
                LocalizationScopeManager.PopLocalizationScope();
            }

            if (_dataServicePushed)
            {
                DataServiceScopeManager.PopDataServiceScope();
            }

            _disposed = true;
        }

        internal void DisableServices()
        {
            DataServiceScopeManager.DisableServices();

            _servicesDisabled = true;
        }

        internal void EnableServices()
        {
            DataServiceScopeManager.EnableServices();

            _servicesDisabled = false;
        }
    }
}
