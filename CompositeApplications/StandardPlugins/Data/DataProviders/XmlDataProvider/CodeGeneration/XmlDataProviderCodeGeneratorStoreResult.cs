using System;
using System.Collections.Generic;
using Composite.Data;


namespace Composite.StandardPlugins.Data.DataProviders.XmlDataProvider.CodeGeneration
{
	public sealed class XmlDataProviderCodeGeneratorStoreResult
	{
        private IXmlDataProviderHelper _helper = null;
        private readonly object _lock = new object();

        public Type GeneratedType { get; internal set; }
        public Type GeneratedDataIdClassType { get; internal set; }

        public List<string> DataScopes { get; internal set; }
        public Dictionary<string, Dictionary<string, StoreInformaion>> Stores { get; internal set; }

        public StoreInformaion GetStoreInformation(string dataScope, string cultureName)
        {
            Dictionary<string, StoreInformaion> dic = this.Stores[dataScope];

            if (dic.ContainsKey(cultureName) == false)
            {
                if (DataLocalizationFacade.IsLocalized(this.GeneratedType) == false)
                {
                    cultureName = "";
                }
                else
                {
                    throw new InvalidOperationException(string.Format("The type '{0}' does not support the culture '{1}'", this.GeneratedType, cultureName));
                }
            }

            return dic[cultureName];
        }

        public IXmlDataProviderHelper Helper
        {
            get
            {
                if (_helper == null)
                {
                    lock (_lock)
                    {
                        if (_helper == null)
                        {
                            _helper = (IXmlDataProviderHelper)Activator.CreateInstance(this.GeneratedType);
                        }
                    }
                }

                return _helper;
            }
        }

        public sealed class StoreInformaion
        {
            internal string Filename { get; set; }
            internal string ElementName { get; set; }
        }
	}
}
