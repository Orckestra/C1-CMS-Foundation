using System;
using System.Globalization;


namespace Composite.Data
{
    public sealed class DataScope : IDisposable
    {
        private bool _dataScopePushed = false;
        private bool _cultureInfoPushed = false;

        public DataScope(DataScopeIdentifier dataScope)
            : this(dataScope, null)
        {
        }



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
            else if (LocalizationScopeManager.IsEmpty == true)
            {
                LocalizationScopeManager.PushLocalizationScope(DataLocalizationFacade.DefaultLocalizationCulture);
                _cultureInfoPushed = true;
            }
        }



        ~DataScope()
        {
            Dispose();
        }



        public void Dispose()
        {
            if (_dataScopePushed == true)
            {
                DataScopeManager.PopDataScope();
            }

            if (_cultureInfoPushed == true)
            {
                LocalizationScopeManager.PopLocalizationScope();
            }
        }
    }
}
