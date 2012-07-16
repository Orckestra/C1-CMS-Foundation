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
        private readonly bool _dataScopePushed = false;
        private readonly bool _cultureInfoPushed = false;


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
            else if (LocalizationScopeManager.IsEmpty == true)
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
            Dispose();
        }



        /// <exclude />
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
