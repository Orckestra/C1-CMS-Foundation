namespace Composite.Actions
{
    internal sealed class DataActionSourceId
    {
        private IDataActionId _dataActionId;
        private string _providerName;


        internal DataActionSourceId(IDataActionId dataActionId, string providerName)
        {
            _dataActionId = dataActionId;
            _providerName = providerName;
        }


        public IDataActionId DataActionId
        {
            get { return _dataActionId; }
        }


        public string ProviderName
        {
            get { return _providerName; }
        }
    }
}
