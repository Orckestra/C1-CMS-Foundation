using System;
using System.Collections.Generic;
using Composite.Data.Plugins.DataProvider.CodeGeneration;


namespace Composite.StandardPlugins.Data.DataProviders.XmlDataProvider.CodeGeneration
{
	public sealed class XmlDataProviderCodeGeneratorStore
	{
        private List<string> _errors = new List<string>();


        public Type InterfaceType { get; set; }
        public string InterfaceTypeName { get; set; }
        public Dictionary<string, Type> DataIdProperties { get; set; }
        public Dictionary<string, string> PropertyNameMapping { get; set; }
        public Dictionary<string, Type> PropertyInitializers { get; set; }
        internal PropertyList PropertyList { get; set; }


        public List<string> DataScopes { get; set; }
        internal Dictionary<string, Dictionary<string, StoreInformaion>> Stores { get; set; }


        public List<string> Errors { get { return _errors; } }
        internal bool Validated { get; set; }

        internal string WrapperClassName { get; set; }
        internal string DataIdClassName { get; set; }
        internal string DataProviderHelperClassName { get; set; }        

        public sealed class StoreInformaion
        {
            public string Filename { get; set; }
            public string ElementName { get; set; }            
        }
	}
}
